import React, { useMemo } from 'react';
import clsx from 'clsx';
import { formatEther } from '@ethersproject/units';

import { BadgePoints } from '@components';
import defaultUserAvatar from '@media/avatar.png';

import styles from './UserItem.module.scss';

interface UserItemProps {
  className?: string;
  fullName: string;
  avatarUrl?: string;
  slaps?: number;
  bonus?: number;
  index?: number;
  tokenAmount?: string;
  date?: string;
}

export const UserItem: React.FC<UserItemProps> = ({
  className,
  fullName,
  avatarUrl,
  slaps,
  bonus = 0,
  tokenAmount,
  index,
  date,
}) => {
  const formattedDate = useMemo(() => {
    const dateInstance = new Date(date || Date.now());

    return dateInstance.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
    });
  }, [date]);

  return (
    <div className={clsx(styles.root, className)}>
      <div className={styles.contentWrap}>
        {index && <div className={styles.index}>{index}</div>}
        <div className={styles.imgWrap}>
          <img
            className={styles.img}
            src={(avatarUrl || defaultUserAvatar).replace(
              /https:\/dev/,
              'https://dev',
            )}
            alt="Avatar"
            width={48}
            height={48}
          />
        </div>
        <div className={styles.wrap}>
          <p className={styles.userName}>{fullName}</p>
          {slaps && (
            <BadgePoints
              variant="unfilled"
              size="small"
              value={slaps}
              className={styles.badge}
            />
          )}
          {tokenAmount && (
            <BadgePoints
              variant="wofr"
              size="small"
              value={parseInt(formatEther(tokenAmount))}
              className={styles.badge}
            />
          )}
        </div>
      </div>
      {bonus !== 0 && <div className={styles.bonus}>+{bonus / 1000}k</div>}
      {date && <div className={styles.date}>{formattedDate}</div>}
    </div>
  );
};
