import { UserRaw, User } from '@app/types';

export const mapUserRawToUser = (userRaw: UserRaw): User => {
  return {
    id: userRaw.id,
    name: userRaw.fullName,
    avatarUrl: userRaw.image,
    leagueId: userRaw.league,
    earnedSlapsToday: userRaw.earnedScoreToday,
    earnedSlapsThisWeek: userRaw.earnedScoreThisWeek,
  };
};
