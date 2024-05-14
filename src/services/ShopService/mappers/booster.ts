import { boostersMap } from '@app/constants/boosters';
import { Booster, BoosterRaw } from '@app/types';

export const boosterMapper = (boosterRaw: BoosterRaw): Booster => ({
  ...boostersMap[boosterRaw.type],
  price: boosterRaw.priceInScore,
  currentLevel: boosterRaw.level,
  maxLevel: boosterRaw.maxLevel,
  type: boosterRaw.type,
});
