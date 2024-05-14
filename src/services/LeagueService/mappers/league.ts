import { League } from '@app/types';
import { leagues } from '@app/constants/league';

export const getLeague = (score: number, isTeam = false): League => {
  const propName: keyof League = isTeam ? 'minTeam' : 'minProfile';

  for (let i = leagues.length - 1; i >= 0; i--) {
    if (leagues[i][propName] <= score) {
      return leagues[i];
    }
  }

  return leagues[0];
};

export const getLeagueIndex = (score: number, isTeam = false): number => {
  const currentLeage = getLeague(score, isTeam);

  const leagueIndex = leagues.findIndex(
    (league) => league.id === currentLeage.id,
  );

  return leagueIndex || 0;
};
