import { Injectable } from '@common/di';
import { MakeObservable, observable } from '@common/state';
import { ApiService } from '../ApiService';

import { mapUserRawToUser } from '../UserService/mappers/user';
import { mapSquadRawToSquad } from './mappers/squad';
import type {
  PaginatedResponse,
  Squad,
  SquadRaw,
  User,
  UserRaw,
} from '@app/types';

@Injectable()
@MakeObservable
export class SquadService {
  @observable
  public squad: Squad | null = null;

  @observable
  public topSquadMembers: User[] = [];

  @observable
  public topSquads: Squad[] = [];

  @observable
  public isSingleSquadLoading = true;

  @observable
  public isTopSquadMembersLoading = true;

  @observable
  public isTopSquadsLoading = false;

  constructor(private readonly apiService: ApiService) {}

  public async leaveSquad(): Promise<void> {
    await this.apiService.post(`squad/leave`);
  }

  public async fetchSquad(id: number): Promise<void> {
    this.isSingleSquadLoading = true;

    const squadRaw = await this.apiService.get<SquadRaw>(`squad/${id}`);

    this.squad = mapSquadRawToSquad(squadRaw);
    this.isSingleSquadLoading = false;
  }

  public async fetchTopSquads(): Promise<void> {
    const params = { limit: 100 };

    this.isTopSquadsLoading = true;

    const squadsRaw = await this.apiService.get<PaginatedResponse<SquadRaw>>(
      '/squad',
      params,
    );

    const squads: Squad[] = squadsRaw.items.map((item) =>
      mapSquadRawToSquad(item),
    );

    this.isTopSquadsLoading = false;

    this.topSquads = squads;
  }

  public async fetchTopMembersBySquad(
    squadId: number,
    period: string,
  ): Promise<void> {
    const params = {
      squadId,
      period,
      limit: 100,
    };

    this.isTopSquadMembersLoading = true;

    const topMembers = await this.apiService.get<PaginatedResponse<UserRaw>>(
      'user/top-by-squad',
      params,
    );

    const users: User[] = topMembers.items.map((item) =>
      mapUserRawToUser(item),
    );

    this.isTopSquadMembersLoading = false;

    this.topSquadMembers = users;
  }
}
