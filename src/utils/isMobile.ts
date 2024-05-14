export const isMobile = () =>
  ['android', 'android_x', 'ios', 'web', 'unknown'].indexOf(window.Telegram.WebApp.platform) >= 0;
