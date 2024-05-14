import React from 'react';
import clsx from 'clsx';

import { BadgePoints } from '@components';
import { Button } from '@ui-kit';

import styles from './CreateInvestorAccountCard.module.scss';

interface CreateInvestorAccountCardProps {
  className?: string;
  score: number;
  title: string;
  btnLabel: string;
  onClick: () => void;
}

export const CreateInvestorAccountCard: React.FC<
  CreateInvestorAccountCardProps
> = ({ className, score, title, btnLabel, onClick }) => {
  return (
    <div className={clsx(styles.root, className)}>
      <h4 className={styles.title}>{title}</h4>
      <BadgePoints variant="default" value={score} className={styles.badge} />

      <Button onClick={onClick} className={styles.button} size="large">
        {btnLabel}
      </Button>
    </div>
  );
};
