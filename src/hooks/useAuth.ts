import { useEffect, useState } from 'react';
import { useServiceState } from '@app/common/state';
import {
  analyticsService,
  configService,
  gameService,
  userService,
} from '@app/services';

export const useAuth = () => {
  const { isAuth } = useServiceState(userService);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const initGame = async () => {
      await userService.fetchProfile();
      await gameService.initialize();

      analyticsService.trackEvent({
        name: 'slap_start_game',
        variables: {
          game_name: 'slap',
        },
      });

      setIsLoading(false);
    };

    if (!isAuth) {
      const initData = configService.isDev
        ? configService.initData
        : window.Telegram?.WebApp?.initData;

      userService.login(initData).then(initGame);

      return;
    }

    initGame();
  }, [isAuth]);

  return { isLoading, isAuth };
};
