import { Booster, DailyBooster } from '@app/types';

export const isDailyBooster = (
  booster: Booster | DailyBooster,
): booster is DailyBooster => {
  return ['full_energy', 'turbo'].includes(booster.type);
};

export const isAutoBot = (booster: Booster | DailyBooster) => {
  return ['auto_bot'].includes(booster.type);
};
