import {
  BoosterEnum,
  BoostersMap,
  SlapMode,
  DailyBoosterMap,
} from '@app/types';

import defaultModeCover from '@media/booster/hand.png';
import floppyFishCover from '@media/booster/fish.png';
import handCreamCover from '@media/booster/pot.png';
import multiSlapCover from '@media/booster/glove.png';
import iceBucketCover from '@media/booster/ice-bucket.png';
import iceSprayCover from '@media/booster/ice-spray.png';
import botCover from '@media/booster/bot.png';

export const boostersIcons: { [key in BoosterEnum]: string } = {
  [BoosterEnum.FloppyFish]: floppyFishCover,
  [BoosterEnum.MultiSlap]: multiSlapCover,
  [BoosterEnum.IceBucket]: iceBucketCover,
  [BoosterEnum.HandCream]: handCreamCover,
  [BoosterEnum.IceSpray]: iceSprayCover,
  [BoosterEnum.Bot]: botCover,
};

export const slapModeIcons: { [key in SlapMode]: string } = {
  [SlapMode.Default]: defaultModeCover,
  [SlapMode.FloppyFish]: floppyFishCover,
  [SlapMode.MultiSlap]: multiSlapCover,
};

export const boostersMap: BoostersMap = {
  energy_max: {
    id: 1,
    title: 'Hand Cream',
    subtitle: 'Increase max slaps',
    shortDesc: 'Increase max slaps',
    desc: '+500 slaps per level',
    enum: BoosterEnum.HandCream,
    icon: handCreamCover,
  },
  energy_per_second: {
    id: 2,
    title: 'Ice Bucket',
    subtitle: 'Recover stamina faster',
    shortDesc: 'Recover stamina faster',
    desc: '+1 slap per second for each level',
    enum: BoosterEnum.IceBucket,
    icon: iceBucketCover,
  },
  energy_per_tap: {
    id: 3,
    title: 'Multi Slap',
    subtitle: 'More slaps for each tap',
    shortDesc: 'More slaps for each tap',
    desc: '+1 slap per tap for each level',
    enum: BoosterEnum.MultiSlap,
    icon: multiSlapCover,
  },

  auto_bot: {
    id: 4,
    title: 'At Your Service',
    subtitle: "Slapping while you're napping",
    shortDesc: "Slapping while you're napping",
    desc: "Don't have the time to slap yourself? At Your Service booster will slap while you are away. However, it can only slap for 8 hours, so don't forget to check on it!  Slaps 60% of the potential peaches you could get yourself. Starts working after an hour of inactivity.",
    enum: BoosterEnum.Bot,
    icon: botCover,
  },
};

export const dailyBoostersMap: DailyBoosterMap = {
  full_energy: {
    id: 1,
    title: 'Recharge Slaps ',
    subtitle: 'Don’t miss it',
    shortDesc: 'Recharge your slaps to the limit',
    desc: 'Recharge your slaps to the limit',
    enum: BoosterEnum.IceSpray,
    icon: iceSprayCover,
  },
  turbo: {
    id: 2,
    title: 'Floppy Fish',
    subtitle: 'Don’t miss it',
    shortDesc: 'Don’t miss it',
    desc: 'Boost your slaps',
    enum: BoosterEnum.FloppyFish,
    icon: floppyFishCover,
  },
};
