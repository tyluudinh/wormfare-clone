import { LeagueEnum, League } from '@app/types';

import commonLeagueIcon from '@media/leagues/common.png';
import rareLeagueIcon from '@media/leagues/rare.png';
import epicLeagueIcon from '@media/leagues/epic.png';
import legendaryLeagueIcon from '@media/leagues/legendary.png';
import mythicLeagueIcon from '@media/leagues/mythic.png';

import commonLeagueBigIcon from '@media/leagues/common-big.png';
import rareLeagueBigIcon from '@media/leagues/rare-big.png';
import epicLeagueBigIcon from '@media/leagues/epic-big.png';
import legendaryLeagueBigIcon from '@media/leagues/legendary-big.png';
import mythicLeagueBigIcon from '@media/leagues/mythic-big.png';

export const leagueBigIcons: { [key in LeagueEnum]: string } = {
  [LeagueEnum.Common]: commonLeagueBigIcon,
  [LeagueEnum.Rare]: rareLeagueBigIcon,
  [LeagueEnum.Epic]: epicLeagueBigIcon,
  [LeagueEnum.Legendary]: legendaryLeagueBigIcon,
  [LeagueEnum.Mythic]: mythicLeagueBigIcon,
};

export const leagueIcons: { [key in LeagueEnum]: string } = {
  [LeagueEnum.Common]: commonLeagueIcon,
  [LeagueEnum.Rare]: rareLeagueIcon,
  [LeagueEnum.Epic]: epicLeagueIcon,
  [LeagueEnum.Legendary]: legendaryLeagueIcon,
  [LeagueEnum.Mythic]: mythicLeagueIcon,
};

export const leagues: League[] = [
  {
    id: 1,
    name: 'Common',
    enum: LeagueEnum.Common,
    minProfile: 0,
    minTeam: 0,
    color: '#AA8B5C ',
  },
  {
    id: 2,
    name: 'Rare',
    enum: LeagueEnum.Rare,
    minProfile: 50000,
    minTeam: 1000000,
    color: '#006EED',
  },
  {
    id: 3,
    name: 'Epic',
    enum: LeagueEnum.Epic,
    minProfile: 500000,
    minTeam: 100000000,
    color: '#9F59FB ',
  },
  {
    id: 4,
    name: 'Legendary',
    enum: LeagueEnum.Legendary,
    minProfile: 5000000,
    minTeam: 1000000000,
    color: '#FDC544 ',
  },
  {
    id: 5,
    name: 'Mythic',
    enum: LeagueEnum.Mythic,
    minProfile: 100000000,
    minTeam: 10000000000,
    color: '#FF4141',
  },
];
