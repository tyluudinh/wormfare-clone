import React, { useState, useEffect } from 'react';
import clsx from 'clsx';

import styles from './Timer.module.scss';

interface TimerProps {
  className?: string;
  endDate: Date;
  onFinish: () => void;
}

export const Timer: React.FC<TimerProps> = ({
  className,
  endDate,
  onFinish,
}) => {
  const [timeRemaining, setTimeRemaining] = useState(() =>
    calculateTimeRemaining(),
  );

  useEffect(() => {
    const timer = setInterval(() => {
      const remainingTime = calculateTimeRemaining();

      setTimeRemaining(remainingTime);

      if (
        remainingTime.hours === '00' &&
        remainingTime.minutes === '00' &&
        remainingTime.seconds === '00'
      ) {
        clearInterval(timer);
        onFinish();
      }
    }, 1000);

    return () => clearInterval(timer);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function calculateTimeRemaining() {
    const currentTime = new Date();
    const timeDiff = Math.max(endDate.getTime() - currentTime.getTime(), 0);
    const hours = Math.floor(timeDiff / (1000 * 60 * 60));
    const minutes = Math.floor((timeDiff % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((timeDiff % (1000 * 60)) / 1000);

    return {
      hours: hours < 10 ? `0${hours}` : hours,
      minutes: minutes < 10 ? `0${minutes}` : minutes,
      seconds: seconds < 10 ? `0${seconds}` : seconds,
    };
  }

  return (
    <div className={clsx(styles.root, className)}>
      <span className={styles.digits}>{timeRemaining.hours}</span>
      <span>:</span>
      <span className={styles.digits}>{timeRemaining.minutes}</span>
      <span>:</span>
      <span className={styles.digits}>{timeRemaining.seconds}</span>
    </div>
  );
};
