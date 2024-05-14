import { Injectable } from '@common/di';
import { MakeObservable, observable } from '@common/state';
import { ApiService } from '../ApiService';
import type { Auction } from '@app/types';

@Injectable()
@MakeObservable
export class AuctionService {
  @observable
  public isActionLoading = false;

  @observable
  public auction: Auction | null = null;

  constructor(private readonly apiService: ApiService) {}

  public async fetchAuction(): Promise<void> {
    this.isActionLoading = true;

    this.auction = await this.apiService.get<Auction>('/auction');

    this.isActionLoading = false;
  }
}
