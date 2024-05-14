import { Injectable } from '@common/di';
import { LocalStorageProvider } from './providers';

interface CacheItem<T = unknown> {
  value: T;
  expireAt?: number;
  tags?: string[];
  version?: number;
}

const userId = window?.Telegram?.WebApp.initDataUnsafe.user?.id || 'no-user-id';

@Injectable()
export class CacheService {
  private storageProvider = new LocalStorageProvider();
  private prefix = `app_${userId}_`;
  private globalVersionKey = `${this.prefix}globalVersion`;

  constructor() {
    this.initializeGlobalVersion();
  }

  private fullKey(key: string): string {
    return this.prefix + key;
  }

  private initializeGlobalVersion(): void {
    if (!this.getGlobalVersion()) {
      this.setGlobalVersion(1);
    }
  }

  getGlobalVersion(): number {
    const version = this.storageProvider.getItem(this.globalVersionKey);

    return version ? parseInt(version, 10) : 0;
  }

  setGlobalVersion(version: number): void {
    this.storageProvider.setItem(this.globalVersionKey, version.toString());
  }

  incrementGlobalVersion(): void {
    const currentVersion = this.getGlobalVersion();

    this.setGlobalVersion(currentVersion + 1);
  }

  getAll() {
    const keys = this.getAllKeys();

    return keys.reduce(
      (acc, key) => {
        const itemStr = this.storageProvider.getItem(key);

        if (itemStr) {
          const item: CacheItem = JSON.parse(itemStr);

          acc[key] = item.value;
        }

        return acc;
      },
      {} as Record<string, unknown>,
    );
  }

  set<T>(
    key: string,
    value: T,
    expireIn?: number,
    tags?: string[],
    version?: number,
  ): void {
    const item: CacheItem<T> = { value, tags, version };

    if (expireIn) {
      item.expireAt = Date.now() + expireIn;
    }

    this.storageProvider.setItem(this.fullKey(key), JSON.stringify(item));
  }

  get<T = unknown>(key: string): T | null {
    const itemStr = this.storageProvider.getItem(this.fullKey(key));

    if (!itemStr) {
      return null;
    }

    const item: CacheItem<T> = JSON.parse(itemStr);

    if (
      (item.expireAt && Date.now() > item.expireAt) ||
      (item.version && item.version < this.getGlobalVersion())
    ) {
      this.remove(key);

      return null;
    }

    return item.value;
  }

  remove(key: string): void {
    this.storageProvider.removeItem(this.fullKey(key));
  }

  invalidateTag(tag: string): void {
    const keys = this.getAllKeys();

    keys.forEach((key) => {
      const itemStr = this.storageProvider.getItem(key);

      if (itemStr) {
        const item: CacheItem = JSON.parse(itemStr);

        if (item.tags && item.tags.includes(tag)) {
          this.storageProvider.removeItem(key);
        }
      }
    });
  }

  private getAllKeys(): string[] {
    const allKeys = this.storageProvider.getAllKeys();

    return allKeys.filter((key) => key.startsWith(this.prefix));
  }
}
