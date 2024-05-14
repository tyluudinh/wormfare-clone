import { Injectable } from '@common/di';
import { MakeObservable, observable } from '@common/state';
import { mapFriendRawToFriend } from './mappers/friend';
import type {
  UserProfile,
  Friend,
  FriendRaw,
  PaginatedResponse,
  Squad,
} from '@app/types';
import { ApiService } from '../ApiService';
import { AuthService } from '../AuthService';
import { CacheService } from '../CacheService';

@Injectable()
@MakeObservable
export class UserService {
  @observable
  public isAuth = false;

  @observable
  public isProfileLoading = false;

  @observable
  public userProfile: UserProfile | null = null;

  @observable
  public friends: Friend[] = [];

  @observable
  public isFriendsLoading = false;

  @observable
  public squad: Squad | null = null;

  constructor(
    private readonly apiService: ApiService,
    private readonly authService: AuthService,
    private readonly cacheService: CacheService,
  ) {
    this.isAuth = this.authService.isAuth();
  }

  public async login(initData: string): Promise<void> {
    const { accessToken } = await this.apiService.post<
      { accessToken: string },
      { initData: string }
    >('/auth/login', {
      initData,
    });

    this.authService.setCredentials(accessToken);
  }

  public async fetchProfile(): Promise<void> {
    this.isProfileLoading = true;
    this.userProfile = await this.apiService.get<UserProfile>(
      '/user/profile',
      {},
    );

    const timestampDelta = Date.now() - this.userProfile.currentTimestamp;

    this.cacheService.set('timestampDelta', timestampDelta);

    this.isProfileLoading = false;
  }

  public async fetchFriends(): Promise<void> {
    const params = { limit: 100 };

    this.isFriendsLoading = true;

    const friendsRaw = await this.apiService.get<PaginatedResponse<FriendRaw>>(
      '/user/my-referrals',
      params,
    );
    const friends: Friend[] = friendsRaw.items.map((item) =>
      mapFriendRawToFriend(item),
    );

    this.isFriendsLoading = false;

    this.friends = friends;
  }

  public async joinSquad(id: number): Promise<void> {
    const body = { id };

    const userProfile = await this.apiService.post<UserProfile>(
      '/squad/join',
      body,
    );

    this.userProfile = userProfile;
  }

  public async leaveSquad(id: number): Promise<void> {
    const body = { id };

    const userProfile = await this.apiService.post<UserProfile>(
      '/squad/leave',
      body,
    );

    this.userProfile = userProfile;
    this.squad = null;
  }
}
