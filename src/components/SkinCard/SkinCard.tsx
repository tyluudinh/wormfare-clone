import React from 'react';
import clsx from 'clsx';
import { motion } from 'framer-motion';

import { BadgePoints } from '@components';
import { Button } from '@ui-kit';
import { SkinRaw } from '@app/types';

import styles from './SkinCard.module.scss';

interface SkinCardProps {
  className?: string;
  score: number;
  skin: SkinRaw;
  isActivate: boolean;
  onActivate: (skin: SkinRaw) => void;
  onBuy: (skin: SkinRaw) => void;
}

export const SkinCard: React.FC<SkinCardProps> = ({
  className,
  score,
  skin,
  isActivate,
  onActivate,
  onBuy,
}) => {
  const getVariant = (skin: SkinRaw, score: number) => {
    return skin.price > score ? 'inactive' : 'default';
  };
  const price = skin ? skin.price || 0 : 0;
  const disabled = Number(price) > score ? true : false;

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
        src={skin.icon}
        className={styles.img}
        alt="Booster Icon"
      />

      <div className={styles.contentWrap}>
        <div className={styles.wrap}>
          {isActivate ? (
            <BadgePoints
              variant="completed"
              size="small"
              value={'Active'}
              className={styles.badge}
            />
          ) : (
            <BadgePoints
              variant={getVariant(skin, score)}
              size="small"
              value={price === 0 ? 'Free' : price}
              className={styles.badge}
            />
          )}
        </div>
        <h4 className={styles.title}>{skin.title}</h4>
        <p className={styles.subtitle}>{skin.subtitle}</p>
        <p className={styles.desc}>{skin.description}</p>
      </div>
      {!skin.isAvailable && (
        <Button
          disabled={disabled}
          onClick={() => onBuy(skin)}
          className={styles.button}
          size="large"
        >
          Get Skin
        </Button>
      )}

      {!isActivate && skin.isAvailable ? (
        <Button
          disabled={disabled}
          onClick={() => onActivate(skin)}
          className={styles.button}
          size="large"
        >
          Activate
        </Button>
      ) : null}
    </div>
  );
};
