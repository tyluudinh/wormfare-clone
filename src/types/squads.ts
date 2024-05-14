import { LeagueEnum } from "./leagues";

export interface Squad {
  id: number;
  originalSquadId: number;
  name: string;
  logo: string;
  members: number;
  slaps: number;
  league: LeagueEnum;
  username: string;
  earnedSlapsToday: number;
  earnedSlapsThisWeek: number;
  totalEarnedScore: number;
  image: string;
}
export interface SquadRaw {
  id: number;
  name: string;
  image: string;
  totalMembers: number;
  totalEarnedScore: number;
  league: LeagueEnum;
  username: string;
  earnedScoreToday: number;
  earnedScoreThisWeek: number;

}

export interface SquadItem {
  id: number;
  originalSquadId: number;
  name: string;
  logo: string;
  members: number;
  slaps: number;
  league: number;
}

export interface SquadItemRaw {
  id: number;
  name: string;
  logo: string;
  members: number;
  slaps: number;
  league: number;
}