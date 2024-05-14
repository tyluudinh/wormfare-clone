import React, { useEffect, useState } from 'react';

import s from './TapReaction.module.scss';

interface TapReactionProps {
  x: number;
  y: number;
  multiplier: number;
}

export const TapReaction: React.FC<TapReactionProps> = ({
  x,
  y,
  multiplier,
}) => {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(false), 3000);

    return () => clearTimeout(timer);
  }, [isVisible]);

  if (!isVisible) {
    return null;
  }

  return (
    <div className={s.root} style={{ top: y, left: x }}>
      +{multiplier}
    </div>
  );
};
