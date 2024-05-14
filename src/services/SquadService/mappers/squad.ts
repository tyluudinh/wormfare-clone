import {
  SquadRaw,
  Squad,
  SquadItem,
  SquadItemRaw,
} from '@app/types';


export const mapSquadRawToSquad = (squadRaw: SquadRaw): Squad => {
  return {
    id: Math.abs(squadRaw.id),
    originalSquadId: squadRaw.id,
    name: squadRaw.name,
    logo: squadRaw.image,
    members: squadRaw.totalMembers,
    slaps: squadRaw.totalEarnedScore,
    league: squadRaw.league,
    username: squadRaw.username,
    earnedSlapsToday: squadRaw.earnedScoreToday,
    earnedSlapsThisWeek: squadRaw.earnedScoreThisWeek,
  } as Squad;
};

export const mapSquadItemRawToSquad = (
  squadItemRaw: SquadItemRaw,
): SquadItem => {
  return {
    id: squadItemRaw.id,
    originalSquadId: squadItemRaw.id,
    name: squadItemRaw.name,
    logo: squadItemRaw.logo,
    members: squadItemRaw.members,
    slaps: squadItemRaw.slaps,
    league: squadItemRaw.league,
  };
};
