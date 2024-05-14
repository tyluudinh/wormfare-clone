import React from 'react';
import clsx from 'clsx';

import { BadgePoints, RewardItem } from '@components';
import { Button } from '@ui-kit';

import styles from './QuestCard.module.scss';

interface QuestCardProps {
  className?: string;
  icon: string;
  title: string;
  subtitle?: string;
  desc?: string;
  ctaLabel?: string;
  reward: number;
  isCompleted: boolean;
  isClaming?: boolean;

  onClaim: () => void;
  onAction?: () => void;
}

export const QuestCard: React.FC<QuestCardProps> = ({
  className,
  icon,
  title,
  subtitle,
  desc,
  reward,
  ctaLabel,
  isCompleted = false,
  isClaming,
  onClaim,
  onAction,
}) => {
  return (
    <div className={clsx(styles.root, className)}>
      <img src={icon} className={styles.img} alt="Booster Icon" />

      <div className={styles.contentWrap}>
        {!isCompleted ? (
          <BadgePoints
            variant="default"
            value={reward}
            className={styles.badge}
          />
        ) : (
          <BadgePoints
            variant="completed"
            value="Completed"
            className={styles.badge}
          />
        )}

        <h4 className={styles.title}>{title}</h4>
        <p className={styles.subtitle}>{subtitle}</p>
        {desc && <p className={styles.desc}>{desc}</p>}
      </div>

      {isCompleted && <RewardItem className={styles.reward} value={reward} />}

      {!isCompleted && ctaLabel && (
        <Button onClick={onAction} className={styles.button} size="large">
          {ctaLabel}
        </Button>
      )}

      {isCompleted && (
        <Button
          onClick={onClaim}
          disabled={isClaming}
          className={styles.button}
          size="large"
        >
          Claim
        </Button>
      )}
    </div>
  );
};
