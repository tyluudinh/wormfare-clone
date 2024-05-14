import React from 'react';
import clsx from 'clsx';

import PreloaderImgUrl from '@media/preloader.png';

import styles from './Preloader.module.scss';

interface PreloaderProps {
  className?: string;
}

export const Preloader: React.FC<PreloaderProps> = ({ className }) => {
  return (
    <div className={clsx(styles.root, className)}>
      <div className={styles.content}>
        <img
          className={styles.img}
          src={PreloaderImgUrl}
          alt="qr code"
          width={256}
        />
        <p className={styles.text}>Butts in position, preparing to slap...</p>
      </div>
    </div>
  );
};
