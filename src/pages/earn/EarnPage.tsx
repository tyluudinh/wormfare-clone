import React from 'react';
import { useNavigate } from 'react-router-dom';

import {
  Page,
  BackButton,
  UserBalance,
  QuestItem,
} from '@components';
import { Tabs } from '@ui-kit';

import { FriendsTab, QuestsTab } from './tabs';
import auctionImg from '@media/auction-icon.png';

import s from './EarnPage.module.scss';

export const EarnPage: React.FC = () => {
  const navigate = useNavigate();
  const [currentTab, setCurrentTab] = React.useState<'quests' | 'friends'>('quests');

  const navigateToGuide = () => {
    window.Telegram?.WebApp?.openLink(
      'https://wormfare.notion.site/A-full-guide-on-Slap-4991283c32384a658bb6922b0a834ae4',
    );
  };

  const navigateToAuction = () => {
    navigate('/auction');
  };

  return (
    <Page className={s.root}>
      <BackButton onClick={() => navigate(-1)} />
      <UserBalance
        className={s.userBalance}
        linkContent="How to earn"
        onClick={navigateToGuide}
      />
      <Tabs
        className={s.tabs}
        variant="secondary"
        tabs={[
          { label: 'Quests', key: 'quests' },
          { label: 'Friends', key: 'friends' },
        ]}
        onTabChange={setCurrentTab}
      />
      <QuestItem
        scoreAmount={1000000}
        className={s.auction}
        title="Daily Peach Auction"
        desc="Get WOFR, win bunch of peaches"
        icon={auctionImg}
        onClick={navigateToAuction}
      />
      {currentTab === 'quests' && <QuestsTab />}
      {currentTab === 'friends' && <FriendsTab />}
    </Page>
  );
};
