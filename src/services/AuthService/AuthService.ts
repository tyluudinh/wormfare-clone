import { Injectable } from '@common/di';
import { CacheService } from '../CacheService';

@Injectable()
export class AuthService {
  static readonly accessTokenKey = '__act__';

  constructor(private readonly cacheService: CacheService) {}

  public setCredentials(accessToken: string): void {
    this.cacheService.set(AuthService.accessTokenKey, accessToken);
  }

  public isAuth(): boolean {
    return !!this.cacheService.get(AuthService.accessTokenKey);
  }

  public getCredentials(): string | null {
    return this.cacheService.get(AuthService.accessTokenKey);
  }
}
