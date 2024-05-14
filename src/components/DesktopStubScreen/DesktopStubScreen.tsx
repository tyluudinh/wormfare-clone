import React from 'react';
import clsx from 'clsx';

import logoImgUrl from '@media/wofr.png';

import styles from './DesktopStubScreen.module.scss';

interface DesktopStubScreenProps {
  className?: string;
}

export const DesktopStubScreen: React.FC<DesktopStubScreenProps> = ({
  className,
}) => {
  return (
    <div className={clsx(styles.root, className)}>
      <p className={styles.text}>Desktop is boring. Play on your mobile.</p>
      <img
        className={styles.img}
        src={logoImgUrl}
        alt="qr code"
        width={200}
        height={200}
      />
    </div>
  );
};
