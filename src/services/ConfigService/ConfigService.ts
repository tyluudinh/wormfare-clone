import { Injectable } from '@common/di';

type AppEnv = 'local' | 'development' | 'production';

@Injectable()
export class ConfigService {
  public readonly apiTimeout: number = 30000;
  public readonly apiUrl: string =
    (import.meta.env.VITE_APP_API_URL as string) ||
    'https://3pjxosan1h.execute-api.eu-central-1.amazonaws.com';
  public readonly isDev: boolean = JSON.parse(
    import.meta.env.VITE_APP_IS_DEV || 'false',
  );
  public readonly accessToken: string = import.meta.env.VITE_APP_ACCESS_TOKEN as string;
  public readonly initData: string = import.meta.env.VITE_APP_INIT_DATA as string;
  public readonly botLink: string = import.meta.env.VITE_APP_BOT_LINK as string;
  public readonly env: AppEnv = import.meta.env.VITE_APP_ENV as AppEnv;

  // Bot detection settings
  public readonly botDetectionMisclicksLimit =
    parseInt(
      import.meta.env.VITE_APP_BOT_DETECTION_MISCLICKS_LIMIT as string,
      10,
    ) || 20;
  public readonly botDetectionMinInterval =
    parseInt(import.meta.env.VITE_APP_BOT_DETECTION_MIN_INTERVAL as string) ||
    20 * 60 * 1000;
  public readonly botDetectionMaxInterval =
    parseInt(import.meta.env.VITE_APP_BOT_DETECTION_MAX_INTERVAL as string) ||
    30 * 60 * 1000;

  public readonly buyTokenPageUrl =
    import.meta.env.VITE_APP_BUY_TOKEN_PAGE_URL ||
    'https://dev.dashboard.wormfare.com/purchase';

  public readonly sentryDsn = import.meta.env.VITE_APP_SENTRY_DSN;
}
