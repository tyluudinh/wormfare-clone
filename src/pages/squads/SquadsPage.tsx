import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import { SquadItem, EmptyListState, BackButton, Page } from '@components';
import { ListItems, Button } from '@ui-kit';
import { squadService } from '@app/services';
import { Skeleton } from '@app/ui-kit/Skeleton';

import { configService } from '@services';
import { useServiceState } from '@app/common/state';

import squadImgUrl from '@media/squads.png';

import s from './Squads.module.scss';

export const SquadsPage: React.FC = () => {
  const navigate = useNavigate();
  const { topSquads, isTopSquadsLoading } = useServiceState(squadService);

  useEffect(() => {
    squadService.fetchTopSquads();
  }, []);

  const navigateToSingleSquad = (squadId: number) => () =>
    navigate(`/squads/${squadId}`);

  const handleJoinAnotherSquad = () => {
    const webApp = window.Telegram.WebApp;

    setTimeout(() => {
      webApp.close();
    }, 1);

    webApp.openTelegramLink(`${configService.botLink}?start=joinsquad`);
  };

  return (
    <Page className={s.root}>
      <BackButton onClick={() => navigate(-1)} />
      <img
        className={s.img}
        src={squadImgUrl}
        alt="squad"
        width={358}
        height={266}
      />
      <h2 className={s.title}>Join Squad</h2>
      <Button className={s.btn} size="large" onClick={handleJoinAnotherSquad}>
        Join Another Squad
      </Button>
      <ListItems
        isLoading={isTopSquadsLoading}
        skeleton={<Skeleton variant="squadItem" />}
        className={s.listWrap}
        listClassName={s.list}
        emptyView={
          <EmptyListState variant="nothing-here" borderRadius="rounded" />
        }
        items={topSquads}
        keyExtractor={({ id }) => id.toString()}
        renderItem={(squad) => (
          <SquadItem
            key={squad.id}
            name={squad.name}
            logo={squad.logo}
            league={squad.league}
            onClick={navigateToSingleSquad(squad.id)}
          />
        )}
      ></ListItems>
    </Page>
  );
};
