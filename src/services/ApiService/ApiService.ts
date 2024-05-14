import { Injectable } from '@common/di';
import axios, { AxiosInstance, InternalAxiosRequestConfig } from 'axios';
import { ConfigService } from '../ConfigService';
import { AuthService } from '../AuthService';
import { CacheService } from '../CacheService';

interface CacheConfig {
  useCache?: boolean;
  ttl?: number;
  tags?: string[];
  key?: string; // Optional: Provide explicit cache key
}

@Injectable()
export class ApiService {
  private readonly axiosInstance: AxiosInstance;

  constructor(
    private readonly configService: ConfigService,
    private readonly authService: AuthService,
    private readonly cacheService: CacheService,
  ) {
    this.axiosInstance = axios.create({
      baseURL: this.configService.apiUrl,
      timeout: this.configService.apiTimeout,
    });

    this.axiosInstance.interceptors.request.use(
      (config: InternalAxiosRequestConfig) => {
        const accessToken = this.authService.getCredentials();

        if (accessToken) {
          console.log(config.headers);
          config.headers['X-Api-Key'] =
            '9m60AhO1I9JmrYIsWxMnThXbF3nDW4GHFA1rde5PKzJmRA9Dv6LZ2YXSM6vvwigC';
          config.headers.Authorization = `Bearer ${accessToken}`;
        }

        return config;
      },
    );

    this.axiosInstance.interceptors.response.use(
      (response) => {
        return response;
      },
      (error) => {
        if (error.response?.status === 401 || error.response?.status === 403) {
          window.location.href = `${window.location.origin}?v=${Math.random()}`;
        }

        return Promise.reject(error);
      },
    );
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  private generateCacheKey(url: string, params?: any): string {
    const paramsPart = params ? JSON.stringify(params) : '';

    return `cache_${encodeURIComponent(url)}_${encodeURIComponent(paramsPart)}`;
  }

  public async get<R, P = unknown>(
    url: string,
    params?: P,
    cacheConfig?: CacheConfig,
  ): Promise<R> {
    let cacheKey = cacheConfig?.key;

    if (cacheConfig?.useCache && !cacheKey) {
      cacheKey = this.generateCacheKey(url, params);
    }

    if (cacheKey && cacheConfig?.useCache) {
      const cachedData = this.cacheService.get<R>(cacheKey);

      if (cachedData) return cachedData;
    }

    const { data } = await this.axiosInstance.get<R>(url, { params });

    if (cacheKey && cacheConfig?.useCache) {
      this.cacheService.set(cacheKey, data, cacheConfig.ttl, cacheConfig.tags);
    }

    return data;
  }

  public async post<R, B = unknown>(
    url: string,
    body?: B,
    cacheConfig?: CacheConfig,
  ): Promise<R> {
    const { data } = await this.axiosInstance.post<R>(url, body);

    // Invalidate cache based on tags if specified after a successful POST request
    if (cacheConfig?.tags) {
      cacheConfig.tags.forEach((tag) => this.cacheService.invalidateTag(tag));
      this.cacheService.incrementGlobalVersion(); // Optional: Increment global version to invalidate cache entries
    }

    return data;
  }
}
