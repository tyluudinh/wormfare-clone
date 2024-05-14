import React from 'react';
import clsx from 'clsx';

import urlImgPoint from '@media/peach.png';
import urlImgLock from '@media/lock.png';
import checkMarkUrl from '@icons/check_mark.png';
import wofrCoinUrl from '@media/wofr-coin.png';

import styles from './BadgePoints.module.scss';

interface BadgePointsProps {
  className?: string;
  value: string | number;
  variant?: 'default' | 'unfilled' | 'inactive' | 'completed' | 'wofr';
  size?: 'small' | 'large' | 'combined';
}

export const BadgePoints: React.FC<BadgePointsProps> = ({
  className,
  value,
  variant = 'default',
  size = 'small',
}) => {
  const classNames = clsx(
    styles.root,
    className,
    styles[variant],
    styles[size],
  );
  const formattedNumber = value.toLocaleString('en-US');

  return (
    <div className={classNames}>
      {variant === 'inactive' && (
        <img className={styles.img} src={urlImgLock} alt="point" />
      )}
      {(variant === 'default' || variant === 'unfilled') && (
        <img className={styles.img} src={urlImgPoint} alt="point" />
      )}
      {variant === 'completed' && (
        <img className={styles.img} src={checkMarkUrl} alt="point" />
      )}

      {variant === 'wofr' && (
        <img className={styles.img} src={wofrCoinUrl} alt="wofr-coin" />
      )}

      <span className={styles.value}>{formattedNumber}</span>
    </div>
  );
};
