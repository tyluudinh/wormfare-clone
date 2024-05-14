import React, { useCallback, useEffect, useState } from 'react';
import clsx from 'clsx';

import { ListItems, Toastify } from '@ui-kit';
import { QuestCard, TaskItem } from './components';
import { Quest } from '@app/types';
import defaultImgUrl from '@media/wormfare.png';
import { questService } from '@app/services';

import styles from './QuestPage.module.scss';

interface QuestPageProps {
  className?: string;
  quest: Quest;
  onClaimed?: () => void;
}

export const QuestPage: React.FC<QuestPageProps> = ({
  className,
  quest,
  onClaimed,
}) => {
  const {
    id: questId,
    isSimpleCheck,
    type,
    title,
    subtitle,
    description,
    isCompleted,
    rewardAmount,
    inProgress,
    icon,
    buttonTitle,
    tasks,
  } = quest;

  const [message, setMessage] = useState('');
  const [isClaming, setIsClaming] = useState(false);

  const showMessage = (message: string) => {
    setMessage(message);
  };

  const handleClaimReward = useCallback(
    async (questId: string) => {
      try {
        showMessage('Claim reward, please wait...');
        setIsClaming(true);
        await questService.claimReward(questId);
        onClaimed?.();
        setIsClaming(false);

        showMessage('Reward successfully received!');
      } catch (error) {
        showMessage('Error claim reward. Please try again.');

        console.error('Claim reward booster:', error);
      }
    },
    [onClaimed],
  );

  const handleStartQuestOrTask = (questId: string, taskId?: number) =>
    questService.startQuestOrTask(questId, taskId);

  useEffect(() => {
    if (!isCompleted && !isSimpleCheck && type === 'simple') {
      questService.checkCompletion(questId);
    }
  }, [isCompleted, isSimpleCheck, questId, type]);

  useEffect(() => {
    const timer = setInterval(() => {
      if (!isCompleted && inProgress && type === 'complex') {
        tasks?.forEach(({ id, isCompleted, inProgress }) => {
          if (!isCompleted && inProgress) {
            questService.checkCompletion(questId, id);
          }
        });
      }

      if (!isCompleted && inProgress && type === 'simple') {
        questService.checkCompletion(questId);
      }
    }, 1500);

    return () => clearInterval(timer);
  }, [inProgress, isCompleted, questId, tasks, type]);

  return (
    <div className={clsx(styles.root, className)}>
      <QuestCard
        className={styles.rewardCard}
        title={title}
        subtitle={subtitle}
        desc={description}
        isCompleted={isCompleted}
        reward={rewardAmount}
        icon={icon || defaultImgUrl}
        ctaLabel={buttonTitle}
        isClaming={isClaming}
        onAction={() => handleStartQuestOrTask(questId)}
        onClaim={() => handleClaimReward(questId)}
      />
      {tasks && (
        <ListItems
          className={styles.listWrap}
          listClassName={styles.list}
          items={tasks}
          keyExtractor={({ id }) => id.toString()}
          renderItem={({ id, title, isCompleted, description }, index) => (
            <TaskItem
              number={index + 1}
              title={title}
              desc={description}
              isCompleted={isCompleted}
              onClick={() => handleStartQuestOrTask(questId, id)}
            />
          )}
        />
      )}
      <Toastify message={message} duration={3000} />
    </div>
  );
};
