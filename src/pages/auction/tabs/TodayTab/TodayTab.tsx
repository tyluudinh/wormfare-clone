import { useEffect, useMemo, useState } from 'react';

import {
  EmptyListState,
  CreateInvestorAccountCard,
  AuctionStats,
  UserItem,
  QuestPage,
} from '@components';
import { ListItems, Skeleton, BottomSheet } from '@ui-kit';
import { configService, userService } from '@services';
import { useServiceState } from '@app/common/state';
import { questService, auctionService } from '@services';

import s from './TodayTab.module.scss';

export const TodayTab: React.FC = () => {
  const { isActionLoading, auction } = useServiceState(auctionService, [
    'auction',
    'isActionLoading',
  ]);
  const { quests } = useServiceState(questService, ['quests']);
  const { userProfile } = useServiceState(userService, ['userProfile']);
  const [isOpen, setIsOpen] = useState(false);

  const conectQuest = quests.find(
    (q) => q.id === '_CreateDashboardAccountQuest',
  );

  const myStats = useMemo(() => {
    if (!auction?.bidders) {
      return null;
    }

    const bidderIndex = auction.bidders.findIndex(
      (bidder) => bidder.id === userProfile?.id,
    );

    if (bidderIndex !== -1) {
      return {
        position: bidderIndex + 1,
        bid: auction.bidders[bidderIndex].tokenAmount,
      };
    }

    return null;
  }, [auction?.bidders, userProfile?.id]);

  useEffect(() => {
    questService.fetchQuests();
    auctionService.fetchAuction();
  }, []);

  const handleClose = () => {
    setIsOpen(false);
  };

  const handleOpen = () => {
    setIsOpen(true);
  };

  const handleClimed = () => {
    setTimeout(() => {
      setIsOpen(false);
    }, 400);
  };

  const handleGetWofr = () => {
    window.Telegram?.WebApp?.openLink(configService.buyTokenPageUrl);
  };

  return (
    <>
      <div>
        {!userProfile?.walletAddress && (
          <>
            <CreateInvestorAccountCard
              score={500000}
              title="Create an Investor’s account First"
              btnLabel="Create an Account"
              onClick={handleOpen}
            />
            <BottomSheet open={isOpen} onClose={handleClose}>
              {conectQuest && (
                <QuestPage
                  className={s.questComplex}
                  quest={conectQuest}
                  onClaimed={handleClimed}
                />
              )}
            </BottomSheet>
          </>
        )}

        {userProfile?.walletAddress && (
          <>
            <AuctionStats
              className={s.stats}
              bid={myStats?.bid}
              rank={myStats?.position}
              name={userProfile.fullName}
              endDate={auction?.endDate}
              onClick={handleGetWofr}
              onFinish={() => auctionService.fetchAuction()}
            />
            <ListItems
              title="Participants"
              emptyView={
                <EmptyListState variant="nothing-here" borderRadius="rounded" />
              }
              skeleton={<Skeleton variant="userItem" />}
              className={s.listWrap}
              listClassName={s.list}
              isLoading={isActionLoading}
              items={auction?.bidders || []}
              keyExtractor={({ id }) => id.toString()}
              renderItem={(user, index) => (
                <UserItem
                  key={user.id}
                  index={index + 1}
                  className={s.userCard}
                  fullName={user.fullName}
                  avatarUrl={user.image}
                  tokenAmount={user.tokenAmount}
                />
              )}
            />
          </>
        )}
      </div>
    </>
  );
};
