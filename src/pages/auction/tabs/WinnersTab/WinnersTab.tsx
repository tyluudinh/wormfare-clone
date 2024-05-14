import React from 'react';

import { UserItem, EmptyListState } from '@components';
import { ListItems, Skeleton } from '@ui-kit';
import { useServiceState } from '@app/common/state';
import { auctionService } from '@app/services';
import { AuctionWinner } from '@app/types';

import s from './WinnersTab.module.scss';

export const WinnersTab: React.FC = () => {
  const { isActionLoading, auction } = useServiceState(auctionService, [
    'auction',
    'isActionLoading',
  ]);

  return (
    <>
      <ListItems<AuctionWinner>
        skeleton={<Skeleton variant="userItem" />}
        className={s.listWrap}
        listClassName={s.list}
        isLoading={isActionLoading}
        emptyView={
          <EmptyListState variant="nothing-here" borderRadius="rounded" />
        }
        items={auction?.pastWinners || []}
        keyExtractor={({ userId }) => userId.toString()}
        renderItem={(winner) => (
          <UserItem
            key={winner.userId}
            className={s.userCard}
            fullName={winner.user.fullName}
            avatarUrl={winner.user.image}
            tokenAmount={winner.tokenAmount}
            date={winner.date}
          />
        )}
      />
    </>
  );
};
