declare namespace JSX {
  interface IntrinsicElements {
    "lottie-player": unknown;
  }
}

interface Navigator {
  vibrate: (pattern: number | number[]) => boolean;
  webkitVibrate: (pattern: number | number[]) => boolean;
  mozVibrate: (pattern: number | number[]) => boolean;
  msVibrate: (pattern: number | number[]) => boolean;
}

interface Window {
  dataLayer?: object[];
  Telegram: {
    WebApp: {
      openTelegramLink: (link: string) => void,
      openLink: (link: string) => void,
      HapticFeedback: {
        impactOccurred: (type: string) => void
      },
      close: () => void,
      expand: () => void,
      BackButton: {
        show: () => void,
        hide: () => void,
      },
      onEvent: (name: string, func: () => void) => void,
      offEvent: (name: string, func: () => void) => void,
      initDataUnsafe: {
        user: {
          id: number
        }
      }
      initData: string
      platform: string
      viewportHeight: number
      viewportStableHeight: number
    }
  }
}