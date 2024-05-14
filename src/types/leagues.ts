export enum LeagueEnum {
  Common = 'common',
  Rare = 'rare',
  Epic = 'epic',
  Legendary = 'legendary',
  Mythic = 'mythic',
}

export interface League {
  id: number;
  name: string;
  enum: LeagueEnum;
  minProfile: number;
  minTeam: number;
  color: string;
}

export type LeagueType = 'slappers' | 'squads';
