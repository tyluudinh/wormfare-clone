import { animate, m, useMotionValue, useTransform } from 'framer-motion';
import React from 'react';

import { numberWithCommas } from '@app/utils';
import { gameService } from '@services';
import { useServiceState } from '@app/common/state';

import peachIcon from '@media/peach.png';

import s from './CoinsIndicator.module.scss';

export const CoinsIndicator = () => {
  const { score } = useServiceState(gameService, ['score']);

  const animatedTries = useMotionValue(0);
  const roundedAnimatedTries = useTransform(
    animatedTries,
    (latest) => `${numberWithCommas(Math.round(latest))}`,
  );

  React.useEffect(() => {
    const controls = animate(animatedTries, score, {
      duration: 0.5,
    });

    return controls.stop;
  }, [score, animatedTries]);

  const calculateDynamicWidth = (text: string) => {
    return text.split('').reduce((acc, char) => {
      return acc + (char === ',' ? 14 : char.match(/[0-9]/) ? 28 : 0);
    }, 0);
  };

  const minWidth = `${calculateDynamicWidth(roundedAnimatedTries.get()) / 48}em`;

  return (
    <div className={s.root}>
      <img className={s.img} src={peachIcon} alt="WOFR token" />
      <m.div className={s.coins} style={{ minWidth }}>
        {roundedAnimatedTries}
      </m.div>
    </div>
  );
};
