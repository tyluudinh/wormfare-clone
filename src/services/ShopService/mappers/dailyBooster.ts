import { dailyBoostersMap } from '@app/constants/boosters';
import { DailyBoosterRaw } from '@app/types';

export const dailyBoosterMapper = (dailyBoosterRaw: DailyBoosterRaw) => ({
  ...dailyBoostersMap[dailyBoosterRaw.type],
  availableCount: dailyBoosterRaw.availableCount,
  maxPerDay: dailyBoosterRaw.maxPerDay,
  usedToday: dailyBoosterRaw.usedToday,
  refreshesAt: dailyBoosterRaw.refreshesAt,
  type: dailyBoosterRaw.type,
});
