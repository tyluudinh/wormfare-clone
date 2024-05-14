import { useCallback, useEffect, useRef, useState } from 'react';
import { useLocation } from 'react-router-dom';
import copy from 'copy-to-clipboard';

import { BottomSheet, Button } from '@app/ui-kit';
import { useServiceState } from '@app/common/state';
import {
  cacheService,
  configService,
  gameService,
  questService,
  shopService,
  userService,
} from '@app/services';
import { sanitizeAndDeduplicateObject } from './utils';

import styles from './DebugInfoPopup.module.scss';

const ACTIVATION_DURATION = 20000;

export const DebugInfoPopup: React.FC = () => {
  const useTouchstartTime = useRef(0);
  const location = useLocation();
  const { isAuth } = useServiceState(userService);
  const [debugInfo, setDebugInfo] = useState<unknown | null>(null);

  const getDebugInfo = useCallback(
    () => ({
      isAuth,
      location,
      gameService,
      configService,
      userService,
      questService,
      shopService,
      cache: cacheService.getAll(),
    }),
    [isAuth, location],
  );

  useEffect(() => {
    const handleTouchStart = () => {
      useTouchstartTime.current = Date.now();
      console.log('touchstart: ', useTouchstartTime.current);
    };

    const handleTouchEnd = () => {
      const touchstartTime = useTouchstartTime.current;

      if (!touchstartTime) {
        return;
      }

      useTouchstartTime.current = 0;

      const touchDuration = Date.now() - touchstartTime;

      console.log('touchend: ', touchDuration);

      if (touchDuration > ACTIVATION_DURATION && !debugInfo) {
        setDebugInfo(
          sanitizeAndDeduplicateObject(getDebugInfo(), [
            'app__act__',
            'accessToken',
          ]),
        );
      }
    };

    window.addEventListener('touchstart', handleTouchStart);
    window.addEventListener('touchend', handleTouchEnd);

    return () => {
      window.removeEventListener('touchstart', handleTouchStart);
      window.removeEventListener('touchend', handleTouchEnd);
    };
  }, [debugInfo, getDebugInfo]);

  const handleClose = () => {
    setDebugInfo(null);

    const text = JSON.stringify(debugInfo, null, 0);

    try {
      copy(text);
      alert('Debug info copied to clipboard');
    } catch (error) {
      console.error('Clipboard error:', error);
    }
  };

  if (debugInfo) {
    return (
      <BottomSheet open={!!debugInfo} onClose={() => setDebugInfo(null)}>
        <div className={styles.content}>
          <pre className={styles.info}>
            {JSON.stringify(debugInfo, null, 2)}
          </pre>
          <Button onClick={handleClose}>Copy and close</Button>
        </div>
      </BottomSheet>
    );
  }

  return null;
};
