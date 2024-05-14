import React from 'react';
import clsx from 'clsx';

import { useServiceState } from '@app/common/state';
import { botHunterService } from '@app/services';
import peachImageUrl from '@media/peach.png';

import styles from './BotHunter.module.scss';
import { Button } from '@app/ui-kit';

export const BotHunter: React.FC = () => {
  const { coords, isChecking, isBotDetected } = useServiceState(
    botHunterService,
    ['coords', 'isChecking', 'isBotDetected'],
  );

  const handleTap = () => {
    botHunterService.handleTapOnPeach();
  };

  const handleOutsideClick = () => {
    botHunterService.handleOutsideClick();
  };

  const handleRestartApp = () => {
    window.Telegram?.WebApp?.close();
  };

  return (
    <div
      className={clsx(styles.root, { [styles.enabled]: isChecking })}
      onClick={handleOutsideClick}
    >
      <div className={styles.content}>
        {isBotDetected ? (
          <>
            <p className={styles.title}>You can't slap the ass anymore!</p>
            <Button className={styles.restartbBtn} onClick={handleRestartApp}>
              Restart app
            </Button>
          </>
        ) : (
          <>
            <p className={styles.desc}>
              Love Big Butts?
              <br />
              Then don't lie!
              <br />
              All the robots are denied!
            </p>
            <p className={styles.title}>
              <b>Tap the peach</b>
              <br />
              to prove you’re real
            </p>
          </>
        )}
      </div>
      {coords && !isBotDetected && (
        <button
          className={styles.btn}
          style={{ left: coords.x, top: coords.y }}
          onClick={handleTap}
        >
          <img src={peachImageUrl} />
        </button>
      )}
    </div>
  );
};
