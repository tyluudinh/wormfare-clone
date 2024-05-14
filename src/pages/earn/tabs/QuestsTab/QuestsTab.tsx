import React, { useEffect, useMemo, useState } from 'react';

import { EmptyListState, QuestItem, QuestPage } from '@components';
import { ListItems, Skeleton, BottomSheet } from '@ui-kit';

import { questService } from '@services';
import { useServiceState } from '@app/common/state';
import { Quest } from '@app/types';
import { groupByField } from '@app/utils';


import defaultImgUrl from '@media/wormfare.png';

import s from './QuestsTab.module.scss';

export const QuestsTab = () => {
  const { quests, isQuestsLoading } = useServiceState(questService, [
    'quests',
    'isQuestsLoading',
  ]);
  const [isOpen, setIsOpen] = React.useState(false);
  const [selectedQuestId, setSelectedQuestId] = useState<Quest['id'] | null>(
    null,
  );

  const inProgressQuests = quests.filter((q) => q.inProgress && !q.isCompleted);

  const groupedByCategory = useMemo(() => {
    const filteredQuests = quests.filter((q) => !q.isRewardClaimed);

    return groupByField(filteredQuests, 'category');
  }, [quests]);

  const selectedQuest = useMemo(
    () => quests.find((q) => q.id === selectedQuestId),
    [quests, selectedQuestId],
  );

  useEffect(() => {
    questService.fetchQuests();
  }, []);

  const handleClose = () => {
    setIsOpen(false);
    setSelectedQuestId(null);
  };

  const handleOpen = (quest: Quest) => {
    if (quest.isLocked) {
      return;
    }

    setIsOpen(true);
    setSelectedQuestId(quest.id);
  };

  const handleClaimed = () => {
    setTimeout(() => {
      setIsOpen(false);
    }, 400);
  };

  return (
    <>
      {!!inProgressQuests.length && (
        <ListItems<Quest>
          key={'In progress'}
          isLoading={isQuestsLoading}
          skeleton={<Skeleton variant="item" />}
          className={s.listWrap}
          listClassName={s.list}
          title={'In progress'}
          emptyView={
            <EmptyListState variant="nothing-here" borderRadius="rounded" />
          }
          items={inProgressQuests}
          keyExtractor={({ id }) => id.toString()}
          renderItem={(quest) => (
            <QuestItem
              type={quest.type}
              title={quest.title}
              desc={quest.subtitle}
              scoreAmount={quest.rewardAmount}
              icon={quest.icon || defaultImgUrl}
              isLocked={quest.isLocked}
              lockedMessage={quest.lockMessage}
              onClick={() => handleOpen(quest)}
            />
          )}
        />
      )}

      {groupedByCategory.map((items) => {
        return (
          <ListItems<Quest>
            key={items[0].category}
            isLoading={true}
            skeleton={<Skeleton variant="item" />}
            className={s.listWrap}
            listClassName={s.list}
            title={items[0].category}
            emptyView={
              <EmptyListState variant="nothing-here" borderRadius="rounded" />
            }
            items={items}
            keyExtractor={({ id }) => id}
            renderItem={(quest) => (
              <QuestItem
                type={quest.type}
                title={quest.title}
                desc={quest.subtitle}
                isCompleted={quest.isCompleted}
                scoreAmount={quest.rewardAmount}
                icon={quest.icon || defaultImgUrl}
                isLocked={quest.isLocked}
                lockedMessage={quest.lockMessage}
                onClick={() => handleOpen(quest)}
              />
            )}
          />
        );
      })}

      <BottomSheet open={isOpen} onClose={handleClose}>
        {selectedQuest && (
          <QuestPage
            className={s.questComplex}
            quest={selectedQuest}
            onClaimed={handleClaimed}
          />
        )}
      </BottomSheet>
    </>
  );
};
