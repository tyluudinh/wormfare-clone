import { LeagueEnum } from "./leagues";
import { Squad } from "./squads";

export interface User {
  id: number;
  name: string;
  avatarUrl: string;
  leagueId: string;
  earnedSlapsToday: number;
  earnedSlapsThisWeek: number;
}
export interface UserRaw {
  id: number;
  fullName: string;
  image: string;
  league: string;
  earnedScoreToday: number;
  earnedScoreThisWeek: number;
}

export interface UserProfile {
  id: number;
  fullName: string;
  image: string;
  league: LeagueEnum;
  earnedScoreToday: string;
  earnedScoreThisWeek: string;
  walletAddress: string;
  currentTimestamp: number;
  skinId?: number;
  invitedByUser?: number;
  autoBotEarnedScore: number;
  boosts: Array<UserBoosts>;
  squad?: Squad;
  squadId?: number;
  rank: number;
  energyLeft: number;
  lastUpdateTimestamp: number;
  manualEarnedScore: number;
  totalEarnedScore: number;
  score: number;
  energyMax: number;
  energyPerSecond: number;
  energyPerTap: number;
  isTurboAvailable: boolean;
}

export type UserBoosts = {
  type: string;
  level: number;
};

export interface Friend {
  id: number;
  name: string;
  avatarUrl: string;
  slaps: number;
  bonus: number;
}

export interface FriendRaw {
  id: number;
  fullName: string;
  image: string;
  totalEarnedScore: number;
  bonusScoreForParentUser: number;
}

export type Period = 'day' | 'week';