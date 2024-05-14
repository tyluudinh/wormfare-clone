import React from 'react';
import clsx from 'clsx';

import styles from './StrokeText.module.scss';

interface StrokeTextProps {
  className?: string;
  text: string;
}

export const StrokeText: React.FC<StrokeTextProps> = ({ className, text }) => {
  return (
    <span className={clsx(styles.root, className)} data-text={text}>
      {text}
    </span>
  );
};
