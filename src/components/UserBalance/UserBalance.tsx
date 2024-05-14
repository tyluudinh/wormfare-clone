import React from 'react';
import clsx from 'clsx';

import { BadgePoints } from '@components';
import { gameService } from '@services';
import { useServiceState } from '@app/common/state';

import styles from './UserBalance.module.scss';

interface UserBalanceProps {
  className?: string;
  linkContent: string;
  onClick?: () => void;
}

export const UserBalance: React.FC<UserBalanceProps> = ({
  className,
  onClick,
  linkContent,
}) => {
  const { score } = useServiceState(gameService, ['score']);

  return (
    <div className={clsx(styles.root, className)}>
      <p className={styles.title}>Your balance</p>
      <BadgePoints
        className={styles.badge}
        value={score}
        variant="unfilled"
        size="large"
      />
      <button className={styles.link} onClick={onClick}>
        {linkContent}
      </button>
    </div>
  );
};
