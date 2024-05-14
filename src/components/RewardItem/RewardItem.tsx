import React from 'react';
import clsx from 'clsx';

import urlImgPoint from '@media/peach.png';

import styles from './RewardItem.module.scss';

interface RewardItemProps {
  className?: string;
  value: string | number;
}

export const RewardItem: React.FC<RewardItemProps> = ({ className, value }) => {
  const classNames = clsx(styles.root, className);
  const formattedNumber = value.toLocaleString('en-US');

  return (
    <div className={classNames}>
      <p className={styles.title}>Your reward</p>
      <div className={styles.wrap}>
        <img className={styles.img} src={urlImgPoint} alt="point" />
        <span className={styles.value}>{formattedNumber}</span>
      </div>
    </div>
  );
};
