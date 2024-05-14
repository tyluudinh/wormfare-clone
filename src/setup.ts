import React from 'react';
import {
  useLocation,
  useNavigationType,
  createRoutesFromChildren,
  matchRoutes,
} from 'react-router-dom';
import TagManager from 'react-gtm-module';
import * as Sentry from '@sentry/react';

import { configService } from './services';

export const setup = () => {
  if (configService.env === 'production') {
    const tagManagerArgs = {
      gtmId: 'GTM-KQ5PVNW4',
    };

    TagManager.initialize(tagManagerArgs);

    Sentry.init({
      dsn: configService.sentryDsn,
      integrations: [
        Sentry.reactRouterV6BrowserTracingIntegration({
          useEffect: React.useEffect,
          useLocation,
          useNavigationType,
          createRoutesFromChildren,
          matchRoutes,
        }),
      ],
      tracesSampleRate: 1.0,
    });
  }
};
