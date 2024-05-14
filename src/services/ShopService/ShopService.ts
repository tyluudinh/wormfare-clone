import { Injectable } from '@common/di';
import { MakeObservable, observable } from '@common/state';
import { UserService } from '../UserService';
import { ApiService } from '../ApiService';
import { GameService } from '../GameService';

import type {
  Booster,
  UserProfile,
  DailyBooster,
  DailyBoosterRaw,
  Shop,
  SkinRaw,
} from '@app/types';
import { dailyBoosterMapper, boosterMapper } from './mappers';
import { AnalyticsService } from '../AnalyticsService';

@Injectable()
@MakeObservable
export class ShopService {
  @observable
  public shop: Shop | null = null;

  @observable
  public boosters: Booster[] = [];

  @observable
  public dailyBoosters: DailyBooster[] = [];
  @observable
  public skins: SkinRaw[] = [];

  @observable
  public isSikinsLoading = false;

  @observable
  public isBuyingSikins = false;

  @observable
  public isActivateSikins = false;

  @observable
  public isShopLooding = false;

  @observable
  public isDailyBoosterLooding = false;

  @observable
  public isBuyingBooster = false;

  @observable
  public isActivateDailyBooster = false;

  @observable
  public isGameLoading = false;
  constructor(
    private readonly apiService: ApiService,
    private readonly userService: UserService,
    private readonly gameService: GameService,
    private readonly analyticsService: AnalyticsService,
  ) {}

  async fetchShop(): Promise<void> {
    this.isShopLooding = true;

    const shop = await this.apiService.get<Shop>('game/shop');
    const boosters = shop.availableBoost.map(boosterMapper);
    const dailyBoosters = shop.dailyBoosts.map(dailyBoosterMapper);
    const skins = shop.skins;

    this.boosters = boosters;

    this.dailyBoosters = dailyBoosters;

    this.skins = skins;

    this.shop = shop;
    this.isShopLooding = false;
  }

  public async buyBooster(type: string): Promise<void> {
    this.isBuyingBooster = true;

    this.analyticsService.trackEvent({
      name: 'boost_usage',
      variables: {
        boost_id: type,
      },
    });

    const userProfile = await this.apiService.post<UserProfile>(
      '/game/buy-boost',
      {
        type,
      },
    );

    this.isBuyingBooster = false;
    this.userService.userProfile = userProfile;
    await this.fetchShop();
    this.gameService.initialize();
  }

  public async activateDailyBooster(type: string): Promise<void> {
    this.isActivateDailyBooster = true;
    await this.gameService.saveScore();

    const dailyBoostersRaw = await this.apiService.post<DailyBoosterRaw[]>(
      'game/activate-daily-boost ',
      {
        type,
      },
    );

    this.dailyBoosters = dailyBoostersRaw.map(dailyBoosterMapper);

    this.isActivateDailyBooster = false;

    await this.fetchShop();
    await this.userService.fetchProfile();
    this.gameService.initialize();
  }

  public async buySkin(skinId: number): Promise<void> {
    this.isBuyingSikins = true;

    const skinsRaW = await this.apiService.post<SkinRaw[]>('game/buy-skin', {
      skinId,
    });

    this.isBuyingSikins = false;
    this.skins = skinsRaW;
    await this.fetchShop();
    await this.userService.fetchProfile();
  }

  public async activateSkins(skinId: number): Promise<void> {
    this.isActivateSikins = true;

    const userProfile = await this.apiService.post<UserProfile>(
      'game/activate-skin',
      {
        skinId,
      },
    );

    this.isActivateSikins = false;

    this.userService.userProfile = userProfile;
    await this.fetchShop();
    await this.userService.fetchProfile();
  }
}
