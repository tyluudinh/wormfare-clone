import { BoosterRaw, DailyBoosterRaw } from "./boosters";
import { SkinRaw } from "./skins";

export interface Shop {
  availableBoost: BoosterRaw[];
  dailyBoosts: DailyBoosterRaw[];
  skins: SkinRaw[];
}