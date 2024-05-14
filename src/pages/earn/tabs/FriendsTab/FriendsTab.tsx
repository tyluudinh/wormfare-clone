import React from 'react';

import { InviteBonusCard, UserItem, EmptyListState } from '@components';
import { ListItems, Button, Skeleton } from '@ui-kit';

import { userService, configService } from '@services';
import { useServiceState } from '@app/common/state';

import s from './FriendsTab.module.scss';

export const FriendsTab = () => {
  const { friends, isFriendsLoading } = useServiceState(userService);

  React.useEffect(() => {
    userService.fetchFriends();
  }, []);

  const handleInviteFriend = () => {
    const webApp = window.Telegram.WebApp;

    setTimeout(() => {
      webApp.close();
    }, 1);

    webApp.openTelegramLink(`${configService.botLink}?start=ref`);
  };

  return (
    <>
      <InviteBonusCard className={s.bonusCard} bonus={5000} />
      <Button onClick={handleInviteFriend} className={s.btn} size="large">
        Invite a friend
      </Button>

      <ListItems
        isLoading={isFriendsLoading}
        skeleton={<Skeleton variant="squadItem" />}
        className={s.listWrap}
        listClassName={s.list}
        title="Friends list"
        emptyView={<EmptyListState borderRadius="rounded" />}
        items={friends}
        keyExtractor={({ id }) => id.toString()}
        renderItem={(friend) => (
          <UserItem
            key={friend.id}
            className={s.userCard}
            fullName={friend.name}
            slaps={friend.slaps}
            bonus={friend.bonus}
            avatarUrl={friend.avatarUrl}
          />
        )}
      />
    </>
  );
};
