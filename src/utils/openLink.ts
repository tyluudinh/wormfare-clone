import { isTelegramLink } from './isTelegramLink';

export const openLink = (url: string) => {
  if (isTelegramLink(url)) {
    window.Telegram?.WebApp?.openTelegramLink(url);
  } else {
    window.Telegram?.WebApp?.openLink(url);
  }
};
