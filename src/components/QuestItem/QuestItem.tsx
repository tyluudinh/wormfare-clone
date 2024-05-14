import React from 'react';
import clsx from 'clsx';

import { BadgePoints } from '../BadgePoints';

import styles from './QuestItem.module.scss';

interface QuestItemProps {
  level?: number;
  className?: string;
  icon: string;
  title: string;
  desc?: string;
  type?: string;
  scoreAmount?: number | string;
  isLocked?: boolean;
  lockedMessage?: string;
  isCompleted?: boolean;
  completeTimes?: number;
  maxCompleteTimes?: number;
  onClick?: () => void;
}

export const QuestItem: React.FC<QuestItemProps> = ({
  className,
  isCompleted,
  icon,
  title,
  desc,
  lockedMessage,
  isLocked,
  scoreAmount,
  completeTimes,
  maxCompleteTimes,
  onClick,
}) => (
  <div className={clsx(styles.root, className)} onClick={onClick}>
    <div className={styles.content}>
      {!isLocked && !isCompleted && scoreAmount ? (
        <BadgePoints
          variant="default"
          size="small"
          value={scoreAmount}
          className={styles.badge}
        />
      ) : null}

      {!isLocked && isCompleted && scoreAmount ? (
        <BadgePoints
          variant="completed"
          size="small"
          value="Completed"
          className={styles.badge}
        />
      ) : null}

      {isLocked && scoreAmount ? (
        <BadgePoints
          variant="inactive"
          size="small"
          value={scoreAmount}
          className={styles.badge}
        />
      ) : null}

      <h4 className={styles.title}>{title}</h4>
      <p className={styles.desc}>{isLocked ? lockedMessage : desc}</p>
      {completeTimes && (
        <p className={styles.desc}>
          Limited: {completeTimes}/{maxCompleteTimes}
        </p>
      )}
    </div>
    <div className={styles.iconWrap}>
      <img src={icon} className={styles.icon} alt="Quest Icon" />
    </div>
  </div>
);
