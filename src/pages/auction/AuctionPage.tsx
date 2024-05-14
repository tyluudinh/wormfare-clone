import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { Page, BackButton, BadgePoints } from '@components';
import { Tabs } from '@ui-kit';

import { WinnersTab, TodayTab } from './tabs';
import auctionImg from '@media/auction.png';

import s from './AuctionPage.module.scss';

export const AuctionPage: React.FC = () => {
  const navigate = useNavigate();
  const [currentTab, setCurrentTab] = useState<'today' | 'winners'>('today');

  return (
    <Page className={s.root}>
      <BackButton onClick={() => navigate(-1)} />
      <div className={s.hero}>
        <img src={auctionImg} className={s.img} alt="Booster Icon" />

        <div className={s.contentWrap}>
          <h4 className={s.title}>Daily Auction</h4>
          <p className={s.desc}>
            Grab more WOFR tokens than anyone else and a million peaches could
            be all yours
          </p>
          <BadgePoints
            variant="unfilled"
            value={1000000}
            className={s.badge}
            size="combined"
          />
        </div>
      </div>
      <Tabs
        className={s.tabs}
        variant="secondary"
        tabs={[
          { label: 'Today', key: 'today' },
          { label: 'Past Winners', key: 'winners' },
        ]}
        onTabChange={setCurrentTab}
      />
      {currentTab === 'today' && <TodayTab />}
      {currentTab === 'winners' && <WinnersTab />}
    </Page>
  );
};
