import React from 'react';
import clsx from 'clsx';

import noFriendsImgUrl from '@media/no-friends.png';
import nothingHereImgUrl from '@media/nothing-here.png';

import styles from './EmptyListState.module.scss';

interface EmptyListStateProps {
  className?: string;
  variant?: 'no-friends' | 'nothing-here';
  borderRadius?: 'none' | 'rounded' | 'bottom';
}

export const EmptyListState: React.FC<EmptyListStateProps> = ({
  className,
  variant = 'no-friends',
  borderRadius = 'none',
}) => {
  return (
    <div
      className={clsx(
        styles.root,
        className,
        styles[variant],
        styles[borderRadius],
      )}
    >
      <img
        className={styles.img}
        src={variant === 'no-friends' ? noFriendsImgUrl : nothingHereImgUrl}
        alt="empty list"
        width={302}
        height={229}
      />
    </div>
  );
};
