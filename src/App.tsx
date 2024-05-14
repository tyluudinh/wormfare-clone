import React, { useEffect } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import {
  GamePage,
  BoostersPage,
  EarnPage,
  LeaguePage,
  SquadsPage,
  SingleSquadPage,
  GeneralLayout,
  AuctionPage,
} from '@app/pages';
import { LazyMotion, domAnimation } from 'framer-motion';
import { configService, gameService } from './services';
import {
  DebugInfoPopup,
  DesktopStubScreen,
  Preloader,
  AutoBotBottomSheet,
  CheatCodeBottomSheet,
} from '@components';
import { isMobile } from '@app/utils';
import { useImagesPreload } from './hooks';
import { imagesToPreload } from './constants/imagesToPreload';
import * as Sentry from '@sentry/react';
import { useAuth } from './hooks/useAuth';
import { useOnCloseApp } from './hooks/useOnCloseApp';

const SentryRoutes = Sentry.withSentryReactRouterV6Routing(Routes);

const App: React.FC = () => {
  const { isLoading } = useAuth();
  const location = useLocation();
  const wormSkinsPreloaded = useImagesPreload(imagesToPreload);

  const closeApp = useOnCloseApp(async () => {
    return gameService.saveScore();
  });

  console.log(!wormSkinsPreloaded)

  useEffect(() => {
    setTimeout(() => {
      window.Telegram?.WebApp.expand();
    }, 0);
  }, []);

  if (!isMobile() && !configService.isDev) {
    return <DesktopStubScreen />;
  }

  if (isLoading) {
    return <Preloader />;
  }

  return (
    <LazyMotion features={domAnimation}>
      <CheatCodeBottomSheet />
      <DebugInfoPopup />
      <AutoBotBottomSheet />
      <AnimatePresence mode="wait">
        <Sentry.ErrorBoundary>
          <SentryRoutes location={location} key={location.pathname}>
            <Route path="/" element={<GamePage onClose={closeApp} />} />
            <Route path="/league" element={<LeaguePage />} />
            <Route element={<GeneralLayout />}>
              <Route path="/auction" element={<AuctionPage />} />
              <Route path="/boosters" element={<BoostersPage />} />
              <Route path="/earn" element={<EarnPage />} />
              <Route path="/squads" element={<SquadsPage />} />
              <Route path="/squads/:squadId" element={<SingleSquadPage />} />
            </Route>
          </SentryRoutes>
        </Sentry.ErrorBoundary>
      </AnimatePresence>
    </LazyMotion>
  );
};

export default App;
