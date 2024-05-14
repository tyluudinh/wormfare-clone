import React from 'react';
import clsx from 'clsx';
import { motion } from 'framer-motion';

import { Button } from '@ui-kit';
import { SkinRaw } from '@app/types';

import styles from './CheatcodeCard.module.scss';

interface CheatcodeCardProps {
  className?: string;
  data: SkinRaw;
  onClick: () => void;
}


export const CheatcodeCard: React.FC<CheatcodeCardProps> = ({
  className,
  data,
  onClick,
}) => {
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
        src={data.icon}
        className={styles.img}
        alt="Booster Icon"
      />

      <div className={styles.contentWrap}>
        <h4 className={styles.title}>{data.title}</h4>
        <p className={styles.subtitle}>{data.subtitle}</p>
        <p className={styles.desc}>{data.description}</p>
      </div>

      <Button onClick={onClick} className={styles.button} size="large">
        Get
      </Button>
    </div>
  );
};
