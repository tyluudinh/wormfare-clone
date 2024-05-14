import React, { useEffect } from 'react';

interface BackButtonProps {
  onClick?: () => void;
  hidden?: boolean;
}

export const BackButton: React.FC<BackButtonProps> = ({
  onClick = () => void 0,
  hidden = false,
}) => {
  useEffect(() => {
    const telegramWebApp = window.Telegram?.WebApp;
    const backButtonAPI = telegramWebApp?.BackButton;

    if (backButtonAPI) {
      backButtonAPI.show();
    }
  }, []);

  useEffect(() => {
    const telegramWebApp = window.Telegram?.WebApp;
    const backButtonAPI = telegramWebApp?.BackButton;

    if (hidden && backButtonAPI) {
      backButtonAPI.hide();
    }
  }, [hidden]);

  useEffect(() => {
    const telegramWebApp = window.Telegram?.WebApp;

    telegramWebApp?.onEvent('backButtonClicked', onClick);

    return () => {
      telegramWebApp?.offEvent('backButtonClicked', onClick);
    };
  }, [onClick]);

  // The component does not render anything
  return null;
};
