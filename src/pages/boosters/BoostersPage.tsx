import React, { useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';

import { Page } from '@components';
import { UserBalance, BackButton } from '@components';
import { Tabs } from '@ui-kit';
import { SkinsTab, BoostersTab } from './tabs';
import { shopService } from '@services';

import s from './BoostersPage.module.scss';

type TabKey = 'boosters' | 'skins';

export const BoostersPage = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [currentTab, setCurrentTab] = React.useState<TabKey>(
    (searchParams.get('tab') as TabKey) || 'boosters',
  );

  useEffect(() => {
    shopService.fetchShop();
  }, []);

  const boosterDescLink = () => {
    window.Telegram?.WebApp?.openLink(
      'https://wormfare.notion.site/A-full-guide-on-Slap-4991283c32384a658bb6922b0a834ae4',
    );
  };

  return (
    <Page className={s.root}>
      <BackButton onClick={() => navigate(-1)} />
      <UserBalance
        className={s.userBalance}
        onClick={boosterDescLink}
        linkContent="How it works"
      />
      <div>
        <Tabs
          initialActiveTab={currentTab}
          className={s.tabs}
          variant="secondary"
          tabs={[
            { key: 'boosters', label: 'Boosters' },
            { key: 'skins', label: 'Skins' },
          ]}
          onTabChange={setCurrentTab}
        />
        {currentTab === 'boosters' && <BoostersTab />}
        {currentTab === 'skins' && <SkinsTab />}
      </div>
    </Page>
  );
};
