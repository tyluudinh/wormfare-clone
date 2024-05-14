import { useCallback, useEffect } from 'react';

let isTryClosing = false;

export const useOnCloseApp = (onClose: () => Promise<void>) => {
  const resetClosing = () => {
    isTryClosing = false;
  };

  useEffect(() => {
    const handleViewportChanged = async () => {
      const viewportHeight = window.Telegram?.WebApp.viewportHeight;
      const viewportStableHeight = window.Telegram?.WebApp.viewportStableHeight;

      if (viewportHeight <= viewportStableHeight * 0.99 && !isTryClosing) {
        isTryClosing = true;
        onClose().finally(resetClosing);
      }
    };

    const handleBeforeUnload = () => {
      if (!isTryClosing) {
        isTryClosing = true;
        onClose().finally(resetClosing);
      }
    };

    const handleVisibilityChange = () => {
      if (document.visibilityState === 'hidden' && !isTryClosing) {
        isTryClosing = true;
        onClose().finally(resetClosing);
      }
    };

    window.Telegram?.WebApp.onEvent('viewportChanged', handleViewportChanged);
    window.addEventListener('beforeunload', handleBeforeUnload);
    document.addEventListener('visibilitychange', handleVisibilityChange);

    return () => {
      window.Telegram?.WebApp.offEvent(
        'viewportChanged',
        handleViewportChanged,
      );
      window.removeEventListener('beforeunload', handleBeforeUnload);
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const close = useCallback(() => {
    onClose();
    setTimeout(() => {
      window.Telegram?.WebApp.close();
    }, 500);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return close;
};
