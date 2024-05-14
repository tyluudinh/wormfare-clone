import React from 'react';
import clsx from 'clsx';

import { BadgePoints } from '../BadgePoints';
import { Booster, DailyBooster } from '@app/types';
import { isDailyBooster, isAutoBot } from '@app/services/ShopService';

import styles from './BoosterItem.module.scss';

interface BoosterItemProps {
  className?: string;
  booster: Booster | DailyBooster;
  score: number;
  onClick?: (booster: Booster | DailyBooster) => void;
}

const getVariant = (booster: Booster | DailyBooster, score: number) => {
  if (
    !isDailyBooster(booster) &&
    isAutoBot(booster) &&
    booster.maxLevel < booster.currentLevel
  ) {
    return 'completed';
  }

  if (isDailyBooster(booster)) {
    return booster.availableCount === 0 ? 'inactive' : 'default';
  }

  return booster.price > score ? 'inactive' : 'default';
};

const getValue = (booster: Booster | DailyBooster) => {
  if (
    !isDailyBooster(booster) &&
    isAutoBot(booster) &&
    booster.maxLevel < booster.currentLevel
  ) {
    return 'Active';
  }

  return isDailyBooster(booster) ? 'Free' : booster.price;
};

export const BoosterItem: React.FC<BoosterItemProps> = ({
  className,
  score,
  booster,
  onClick,
}) => {

  return (
    <div
      className={clsx(styles.root, className)}
      onClick={() => onClick?.(booster)}
    >
      <div className={styles.content}>
        <div className={styles.wrap}>
          <BadgePoints
            variant={getVariant(booster, score)}
            size="small"
            value={getValue(booster)}
            className={styles.badge}
          />
          {isDailyBooster(booster) && (
            <span className={styles.available}>
              {booster.availableCount}/{booster.maxPerDay}
            </span>
          )}

          {!isDailyBooster(booster) && !isAutoBot(booster) && (
            <span className={styles.level}>level {booster.currentLevel}</span>
          )}
        </div>
        <h4 className={styles.title}>{booster.title}</h4>
        <p className={styles.desc}>{booster.shortDesc}</p>
      </div>
      <div className={styles.iconWrap}>
        <img src={booster.icon} className={styles.icon} alt="Booster Icon" />
      </div>
    </div>
  );
};
