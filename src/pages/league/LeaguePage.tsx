import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import {
  UserItem,
  LeagueSwitcher,
  BackButton,
  SquadItem,
  EmptyListState,
  Page,
} from '@components';
import { ListItems, Tabs, Skeleton } from '@ui-kit';
import { LeagueEnum, Period, LeagueType } from '@app/types';

import { userService, leagueService } from '@services';
import { useServiceState } from '@app/common/state';

import s from './LeaguePage.module.scss';

export const LeaguePage: React.FC = () => {
  const navigate = useNavigate();
  const [league, setLeague] = useState(LeagueEnum.Common);
  const [period, setPeriod] = useState<Period>('day');
  const [leagueType, setLeaguType] = useState<LeagueType>('slappers');
  const { userProfile } = useServiceState(userService);
  const { topSlappers, topSquads, isTopSlappersLoading, isTopSquadsLoading } =
    useServiceState(leagueService);

  useEffect(() => {
    leagueService.fetchTopSlappersByLeague(league, period, 100);
  }, [league, period]);

  useEffect(() => {
    leagueService.fetchTopSquadsByLeague(league, period, 100);
  }, [league, period]);
  console.log(league);

  const navigateToSingleSquad = (squadId: number) => () =>
    navigate(`/squads/${squadId}`);

  return (
    <Page className={s.root}>
      <BackButton onClick={() => navigate(-1)} />

      <LeagueSwitcher
        leagueType={leagueType}
        userLeague={userProfile?.league || LeagueEnum.Common}
        onLeagueChange={(newLeague) => {
          setLeague(newLeague);
        }}
      />
      <div className={s.wrap}>
        <Tabs<LeagueType>
          className={s.tabs}
          variant="secondary"
          tabs={[
            { key: 'slappers', label: 'Slappers' },
            { key: 'squads', label: 'Squads' },
          ]}
          onTabChange={(tabKey: string) => setLeaguType(tabKey as LeagueType)}
        />

        <Tabs<Period>
          className={s.tabsInner}
          variant="primary"
          tabs={[
            { key: 'day', label: 'Day' },
            { key: 'week', label: 'Weekly' },
          ]}
          onTabChange={(tabKey: string) => setPeriod(tabKey as Period)}
        />

        {leagueType === 'slappers' ? (
          <ListItems
            emptyView={
              <EmptyListState variant="nothing-here" borderRadius="bottom" />
            }
            isLoading={isTopSlappersLoading}
            skeleton={<Skeleton variant="squadItem" />}
            className={s.listWrap}
            listClassName={s.list}
            items={topSlappers}
            keyExtractor={({ id }) => id.toString()}
            renderItem={(user, index) => (
              <UserItem
                key={user.id}
                index={index + 1}
                className={s.userCard}
                fullName={user.name}
                slaps={
                  (period === 'day'
                    ? user.earnedSlapsToday
                    : user.earnedSlapsThisWeek) || 0
                }
                avatarUrl={user.avatarUrl}
              />
            )}
          />
        ) : (
          <ListItems
            emptyView={
              <EmptyListState variant="nothing-here" borderRadius="bottom" />
            }
            isLoading={isTopSquadsLoading}
            skeleton={<Skeleton variant="squadItem" />}
            className={s.listWrap}
            listClassName={s.list}
            items={topSquads}
            keyExtractor={({ id }) => id.toString()}
            renderItem={(squad, index) => (
              <SquadItem
                key={squad.id}
                index={index + 1}
                className={s.userCard}
                name={squad.name}
                slaps={
                  period === 'day'
                    ? squad.earnedSlapsToday
                    : squad.earnedSlapsThisWeek
                }
                logo={squad.logo}
                onClick={navigateToSingleSquad(squad.id)}
              />
            )}
          />
        )}
      </div>
    </Page>
  );
};

export default LeaguePage;
