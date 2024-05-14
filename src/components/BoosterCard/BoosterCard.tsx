import React from 'react';
import clsx from 'clsx';
import { motion } from 'framer-motion';

import { BadgePoints } from '@components';
import { Button } from '@ui-kit';
import { Booster, DailyBooster } from '@app/types';
import { isDailyBooster, isAutoBot } from '@app/services/ShopService/guards';

import styles from './BoosterCard.module.scss';

interface BoosterCardProps {
  className?: string;
  score: number;
  booster: Booster | DailyBooster;
  onActivate: (booster: Booster | DailyBooster) => void;
}

export const BoosterCard: React.FC<BoosterCardProps> = ({
  className,
  score,
  booster,
  onActivate,
}) => {
  const disabled = Number(booster) > score ? true : false;
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

  return (
    <div className={clsx(styles.root, className)}>
      <motion.img
        animate={{
          rotate: [0, 10, -10, 10, -10, 10, -10, 0],
        }}
        transition={{
          duration: 0.8,
          ease: 'easeInOut',
          delay: 0.7,
        }}
        src={booster.icon}
        className={styles.img}
        alt="Booster Icon"
      />

      <div className={styles.contentWrap}>
        <div className={styles.wrap}>
          <BadgePoints
            variant={getVariant(booster, score)}
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
        <p className={styles.subtitle}>{booster.subtitle}</p>
        <p className={styles.desc}>{booster.desc}</p>
      </div>
      {!isDailyBooster(booster) &&
      booster.maxLevel < booster.currentLevel ? null : (
        <Button
          disabled={disabled}
          onClick={() => onActivate(booster)}
          className={styles.button}
          size="large"
        >
          Use Boost
        </Button>
      )}
    </div>
  );
};
