import React from 'react';
import clsx from 'clsx';

// import UrlAlertIcon from '@icons/alert-icon.png';
import UrlAlertIcon from '@media/peach.png';

import styles from './Alert.module.scss';

interface AlertProps {
  className?: string;
  alertMsg: string;
}

export const Alert: React.FC<AlertProps> = ({ className, alertMsg }) => {
  return (
    <div className={clsx(styles.root, className)}>
      <img
        className={styles.icon}
        src={UrlAlertIcon}
        alt="alert icon"
        width={19}
        height={20}
      />
      <p className={styles.msg}>{alertMsg}</p>
    </div>
  );
};
