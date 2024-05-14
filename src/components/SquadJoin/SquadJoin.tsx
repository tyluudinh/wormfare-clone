import React from 'react';
import clsx from 'clsx';

import { Button } from '@ui-kit';

import styles from './SquadJoin.module.scss';

interface SquadJoinProps {
  className?: string;
  avatarUrl?: string;
  name: string;
  isJoined?: boolean;
  onJoin?: () => void;
  onLeave?: () => void;
}

export const SquadJoin: React.FC<SquadJoinProps> = ({
  className,
  avatarUrl,
  name,
  isJoined,
  onJoin,
  onLeave,
}) => {
  return (
    <div className={clsx(styles.root, className)}>
      <div className={styles.wrap}>
        <img
          className={styles.img}
          src={avatarUrl}
          alt="Avatar of the squad"
          width={100}
          height={100}
        />
        {isJoined ? (
          <p className={styles.text}>Are you going to leave?</p>
        ) : (
          <p className={styles.text}>You’re about to join</p>
        )}

        <p className={styles.name}>{name}</p>
      </div>
      {isJoined ? (
        <Button className={styles.btn} size="large" onClick={onLeave}>
          Leave
        </Button>
      ) : (
        <Button className={styles.btn} size="large" onClick={onJoin}>
          Join
        </Button>
      )}
    </div>
  );
};
