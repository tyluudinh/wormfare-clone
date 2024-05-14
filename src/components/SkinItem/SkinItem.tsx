import React from 'react';
import clsx from 'clsx';

import { BadgePoints } from '../BadgePoints';
import { SkinRaw } from '@app/types';

import styles from './SkinItem.module.scss';

interface SkinItemProps {
  className?: string;
  skin: SkinRaw;
  score: number;
  isActivate: boolean;
  onClick?: (skin: SkinRaw) => void;
}

const getVariant = (skin: SkinRaw, score: number, isActivate: boolean) => {
  if (isActivate) {
    return 'completed';
  }

  if (skin.price > score) {
    return 'inactive';
  } else {
    return 'default';
  }
};

const getValue = (skin: SkinRaw, isActivate: boolean): number | string => {
  if (isActivate) {
    return 'Active';
  }

  if (skin.isAvailable) {
    return 'Available';
  }

  if (skin.price === 0) {
    return 'Free';
  }

  return skin.price;
};

export const SkinItem: React.FC<SkinItemProps> = ({
  className,
  score,
  skin,
  isActivate,
  onClick,
}) => {
  return (
    <div
      className={clsx(styles.root, className)}
      onClick={() => onClick?.(skin)}
    >
      <div className={styles.content}>
        <div className={styles.wrap}>
          <BadgePoints
            variant={getVariant(skin, score, isActivate)}
            size="small"
            value={getValue(skin, isActivate)}
            className={styles.badge}
          />
        </div>
        <h4 className={styles.title}>{skin.title}</h4>
        <p className={styles.desc}>{skin.subtitle}</p>
      </div>
      <div className={styles.iconWrap}>
        <img src={skin.icon} className={styles.icon} alt="Skin Icon" />
      </div>
    </div>
  );
};
