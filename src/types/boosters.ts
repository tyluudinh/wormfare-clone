export enum BoosterEnum {
  FloppyFish = 'floppyFish',
  MultiSlap = 'multiSlap',
  IceBucket = 'iceBucket',
  HandCream = 'handCream',
  IceSpray = 'IceSpray',
  Bot = 'bot',
}

export enum SlapMode {
  Default = 'default',
  FloppyFish = 'floppyFish',
  MultiSlap = 'multiSlap',
}

export interface Booster {
  id: number;
  enum: BoosterEnum;
  title: string;
  subtitle: string;
  desc: string;
  shortDesc: string;
  price: number;
  available?: number;
  currentLevel: number;
  type: string;
  icon: string;
  maxLevel: number;
}

export interface BoosterRaw {
  type: 'energy_max' | 'energy_per_second' | 'energy_per_tap' | 'auto_bot';
  level: number;
  maxLevel: number;
  priceInScore: number;
  priceInExtra: number;
}

export type BoostersMap = {
  [key in BoosterRaw['type']]: {
    id: number;
    enum: BoosterEnum;
    title: string;
    subtitle: string;
    desc: string;
    shortDesc: string;
    icon: string;
  };
};

export interface DailyBooster {
  id: number;
  enum: BoosterEnum;
  title: string;
  subtitle: string;
  desc: string;
  shortDesc: string;
  type: string;
  maxPerDay: number;
  usedToday: number;
  availableCount: number;
  refreshesAt: string;
  icon: string;
}

export interface DailyBoosterRaw {
  type: 'full_energy' | 'turbo';
  maxPerDay: number;
  usedToday: number;
  availableCount: number;
  refreshesAt: string;
}

export type DailyBoosterMap = {
  [key in DailyBoosterRaw['type']]: {
    id: number;
    enum: BoosterEnum;
    title: string;
    subtitle: string;
    desc: string;
    shortDesc: string;
    icon: string;
  };
};
