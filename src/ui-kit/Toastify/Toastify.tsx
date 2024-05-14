import React, { useState, useEffect } from 'react';
import clsx from 'clsx';

import { Alert } from '../Alert';

import styles from './Toastify.module.scss';

interface ToastifyProps {
  className?: string;
  message: string;
  duration: number;
}

export const Toastify: React.FC<ToastifyProps> = ({
  className,
  message,
  duration,
}) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (message) {
      setIsVisible(true);

      const timeout = setTimeout(() => {
        setIsVisible(false);
      }, duration);

      return () => clearTimeout(timeout);
    }
  }, [message, duration]);

  // if (!isVisible) return null;

  return (
    <>
      <div
        className={clsx(styles.root, className, {
          [styles.visible]: isVisible,
          [styles.hidden]: !isVisible,
        })}
      >
        <Alert alertMsg={message} />
      </div>
    </>
  );
};
