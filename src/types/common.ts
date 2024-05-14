import { SkinRaw } from "./skins"

export interface PaginatedResponse<T> {
  items: T[]
  total: number
  page: number
  limit: number
}

export interface ApiResponse {
  success: boolean
}

export type Coordinates = {
  x: number;
  y: number;
};

export type CheatCode = {
  data: SkinRaw;
}