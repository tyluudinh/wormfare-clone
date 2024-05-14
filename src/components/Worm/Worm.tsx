import React, {
  useEffect,
  useRef,
  useState,
  cloneElement,
  useCallback,
} from 'react';
import { clsx } from 'clsx';
import _throttle from 'lodash/throttle';
import { useLottie } from 'lottie-react';

import { CoolDown, TapReaction } from '@components';
import {
  userService,
  gameService,
  cheatСodeService,
  soundService,
} from '@services';
import { useServiceState } from '@app/common/state';

import wormAnimation from './anim.json';

import s from './Worm.module.scss';
import { vibrate } from '@app/utils';
import { getSkin, isSingleTouch, getTapSide } from './utils';

export const Worm: React.FC = () => {
  const rootRef = useRef<HTMLDivElement>(null);
  const rectRef = useRef<DOMRect>();
  const { userProfile } = useServiceState(userService);

  const { View, goToAndPlay, animationItem } = useLottie({
    animationData: wormAnimation,
    assetsPath: `/skins/${getSkin(userProfile?.skinId)}/`,
  });

  const { lock } = useServiceState(gameService, ['lock']);
  const [tapPositions, setTapPositions] = useState<
    { x: number; y: number; multiplier: number }[]
  >([]);

  useEffect(() => {
    goToAndPlay('idle' as unknown as number, true);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    const rect = rootRef.current?.getBoundingClientRect();

    console.log('rect: ', rect);

    if (rect) {
      rectRef.current = rect;
    }
  }, []);

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const animateSlap = useCallback(
    _throttle((side: 'left' | 'right' | 'both') => {
      const onAnimationComplete = () => {
        try {
          goToAndPlay('idle' as unknown as number, true);
          animationItem?.removeEventListener(
            'loopComplete',
            onAnimationComplete,
          );
        } catch (e) {
          console.error(e);
        }
      };

      animationItem?.addEventListener('loopComplete', onAnimationComplete);

      // hardfix for lottie-react
      goToAndPlay(`${side}_butt_slap` as unknown as number, true);
    }, 300),
    [animationItem],
  );

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const handleTap = useCallback(
    (event: React.TouchEvent<HTMLDivElement>) => {
      const rect = rectRef.current;

      window.Telegram?.WebApp.expand();

      if (!rect || gameService.lock) {
        return;
      }

      const side = getTapSide(event);

      gameService.click();

      vibrate();

      // playSoundTap();
      soundService.playSoundTap();

      animateSlap(side);

      if (isSingleTouch(event)) {
        cheatСodeService.detectCheatCode(side === 'right' ? 'R' : 'L');
      }

      const multiplier = userProfile?.energyPerTap || 1;

      const newTapPositions = Array.from(event.touches).map((touch) => ({
        multiplier: multiplier * gameService.turboTapMult,
        x: touch.clientX - rect.left,
        y: touch.clientY - rect.top,
      }));

      setTapPositions((prevPositions) => [
        ...prevPositions,
        ...newTapPositions,
      ]);
    },
    [animateSlap, userProfile?.energyPerTap],
  );

  return (
    <div className={clsx(s.root, { [s.lock]: lock > 0 })} ref={rootRef}>
      <CoolDown className={s.cooldown} date={lock} />
      <div className={s.tapArea} onTouchStart={handleTap}></div>
      {cloneElement(View, { className: s.worm })}
      {tapPositions.map((position, index) => (
        <TapReaction
          key={index}
          x={position.x}
          y={position.y}
          multiplier={position.multiplier}
        />
      ))}
    </div>
  );
};
