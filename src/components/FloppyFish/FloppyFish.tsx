import React from 'react';
import clsx from 'clsx';
import imgFishUrl from '@media/fish.png';

import styles from './FloppyFish.module.scss';

interface FloppyFishProps {
  className?: string;
  positionX: string | number;
  positionY: string | number;

  onClick?: () => void;
}

// const excludeArea: ExcludeAreaCoords = [20, 47, 70, 30];
// const objectSize: ObjectSize = [87, 71];

export const FloppyFish: React.FC<FloppyFishProps> = ({
  className,
  positionX,
  positionY,

  onClick,
}) => {
  return (
    <button
      className={clsx(styles.root, className)}
      onClick={onClick}
      style={{ left: positionX, top: positionY }}
    >
      <img className={styles.img} src={imgFishUrl} alt="fish img" />
    </button>
  );
};
