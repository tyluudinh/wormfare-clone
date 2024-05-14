import { Injectable } from '@common/di';
import { MakeObservable, observable } from '@common/state';
import { ApiService } from '../ApiService';

import { mapUserRawToUser } from '../UserService/mappers/user';
import { mapSquadRawToSquad } from '../SquadService/mappers/squad';

import type {
  PaginatedResponse,
  Squad,
  SquadRaw,
  User,
  UserRaw,
  LeagueEnum,
} from '@app/types';

@Injectable()
@MakeObservable
export class LeagueService {
  @observable
  public topSlappers: User[] = [];

  @observable
  public topSquads: Squad[] = [];

  @observable
  public isTopSlappersLoading = false;

  @observable
  public isTopSquadsLoading = false;

  constructor(private readonly apiService: ApiService) {}

  public async fetchTopSlappersByLeague(
    league: LeagueEnum,
    period: string,
    limit: number,
  ): Promise<void> {
    const params = {
      league,
      period,
      limit,
    };

    this.isTopSlappersLoading = true;

    const topSlappersByLeague = await this.apiService.get<
      PaginatedResponse<UserRaw>
    >('user/top-by-league', params);

    const users: User[] = topSlappersByLeague.items.map((item) =>
      mapUserRawToUser(item),
    );

    this.isTopSlappersLoading = false;

    this.topSlappers = users;
  }

  public async fetchTopSquadsByLeague(
    league: LeagueEnum,
    period: string,
    limit: number,
  ): Promise<void> {
    const params = {
      league,
      period,
      limit,
    };

    this.isTopSquadsLoading = true;

    const topSquadsByLeague = await this.apiService.get<
      PaginatedResponse<SquadRaw>
    >('squad/top-by-league', params);

    const squads: Squad[] = topSquadsByLeague.items.map((item) =>
      mapSquadRawToSquad(item),
    );

    this.isTopSquadsLoading = false;

    this.topSquads = squads;
  }
}
