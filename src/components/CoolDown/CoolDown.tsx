import React, { useEffect, useState } from 'react';
import clsx from 'clsx';

import { StrokeText } from '@app/ui-kit';

import styles from './CoolDown.module.scss';

interface CoolDownProps {
  className?: string;
  date: number;
}

const calcTimeDelta = (date: number) => {
  if (date === 0) {
    return 0;
  }

  return Math.ceil((date - Date.now()) / 1000);
};

export const CoolDown: React.FC<CoolDownProps> = ({ className, date }) => {
  const [coolDown, setCoolDown] = useState(() => calcTimeDelta(date));

  useEffect(() => {
    const newTimeDelta = calcTimeDelta(date);

    setCoolDown(newTimeDelta);
  }, [date]);

  useEffect(() => {
    const timerId = setInterval(() => {
      setCoolDown((prevCoolDown) => {
        if (prevCoolDown === 0) {
          return 0;
        }

        return prevCoolDown - 1;
      });
      // increase interval to 1050 to avoid flickering
    }, 1050);

    return () => {
      clearInterval(timerId);
    };
  }, []);

  return (
    <div className={clsx(styles.root, className)}>
      <StrokeText className={styles.number} text={coolDown.toString()} />
    </div>
  );
};
