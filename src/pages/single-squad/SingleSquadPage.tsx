import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import { Skeleton } from '@app/ui-kit/Skeleton';
import {
  UserItem,
  SquadCard,
  SquadJoin,
  BackButton,
  EmptyListState,
  Page,
} from '@components';
import { ListItems, Tabs, BottomSheet } from '@ui-kit';
import { Period, User } from '@app/types';

import { useServiceState } from '@app/common/state';
import { userService, squadService } from '@services';

import s from './SingleSquad.module.scss';

export const SingleSquadPage: React.FC = () => {
  const { userProfile } = useServiceState(userService);
  const { squad, topSquadMembers, isTopSquadMembersLoading } =
    useServiceState(squadService);

  const params = useParams();
  const squadId = parseInt(params.squadId || '0');
  const navigate = useNavigate();

  const [isOpen, setIsOpen] = useState(false);
  const [period, setPeriod] = useState<Period>('day');

  useEffect(() => {
    squadService.fetchTopMembersBySquad(squadId, period);
  }, [squadId, period]);

  useEffect(() => {
    squadService.fetchSquad(squadId);
  }, [squadId]);

  const handleClose = () => setIsOpen(false);

  const handleOpen = () => setIsOpen(true);

  const handleLeave = async () => {
    await userService.leaveSquad(squadId);
    squadService.fetchTopMembersBySquad(squadId, period);
    squadService.fetchSquad(squadId);
    setIsOpen(false);
  };

  const handleJoin = async () => {
    await userService.joinSquad(squadId);
    squadService.fetchTopMembersBySquad(squadId, period);
    squadService.fetchSquad(squadId);
    setIsOpen(false);
  };

  const handleClick = () => {
    if (squad?.username) {
      window.Telegram?.WebApp?.openLink(`https://t.me/${squad.username}`);
    }
  };

  if (!squad) {
    return null;
  }

  return (
    <Page className={s.root}>
      <BackButton onClick={() => navigate(-1)} />
      <SquadCard
        name={squad.name}
        logo={squad.logo}
        league={squad.league}
        members={squad.members}
        slaps={squad.slaps}
        isJoined={userProfile?.squadId === squad.originalSquadId}
        onClick={handleClick}
        onJoin={handleOpen}
        onLeave={handleOpen}
      />
      <div className={s.wrap}>
        <Tabs<Period>
          variant="primary"
          tabs={[
            { key: 'day', label: 'Day' },
            { key: 'week', label: 'Weekly' },
          ]}
          onTabChange={setPeriod}
        />
        <ListItems<User>
          emptyView={
            <EmptyListState variant="nothing-here" borderRadius="bottom" />
          }
          isLoading={isTopSquadMembersLoading}
          skeleton={<Skeleton variant="squadItem" />}
          className={s.listWrap}
          listClassName={s.list}
          items={topSquadMembers}
          keyExtractor={({ id }) => id.toString()}
          renderItem={(user, index) => (
            <UserItem
              index={index + 1}
              key={user.id}
              className={s.userCard}
              fullName={user.name}
              slaps={
                period === 'day'
                  ? user.earnedSlapsToday
                  : user.earnedSlapsThisWeek
              }
              avatarUrl={user.avatarUrl}
            />
          )}
        ></ListItems>
      </div>

      <BottomSheet
        className={s.bottomSheet}
        open={isOpen}
        onClose={handleClose}
      >
        <SquadJoin
          className={s.squadJoin}
          name={squad.name}
          avatarUrl={squad.logo}
          onJoin={handleJoin}
          onLeave={handleLeave}
          isJoined={userProfile?.squadId === squad.originalSquadId}
        />
      </BottomSheet>
    </Page>
  );
};
