import React from 'react';
import clsx from 'clsx';
import { useNavigate } from 'react-router-dom';

import { Button } from '@ui-kit';
import { SlapsIndicator } from '@components';
import { gameService } from '@services';
import { useServiceState } from '@app/common/state';

import rocketIconUrl from '@media/rocket.png';
import rollIconUrl from '@media/roll.png';

import styles from './BottomNav.module.scss';

interface BottomNavProps {
  className?: string;
}

export const BottomNav: React.FC<BottomNavProps> = ({ className }) => {
  const navigate = useNavigate();
  const { energy } = useServiceState(gameService, ['energy']);
  const availableToClick = Math.floor(energy);

  const handleNavigateToEarn = () => {
    navigate('/earn');
  };

  const handleNavigateToBoosters = () => {
    navigate('/boosters');
  };

  return (
    <div className={clsx(styles.root, className)}>
      <div className={styles.bg}></div>
      <Button
        className={styles.invite}
        leftIcon={<img src={rollIconUrl} alt="earn icon" />}
        onClick={handleNavigateToEarn}
      >
        earn
      </Button>
      <div className={styles.slaps} onClick={handleNavigateToBoosters}>
        <SlapsIndicator slapsValue={availableToClick} />
      </div>
      <Button
        className={styles.boost}
        rightIcon={<img src={rocketIconUrl} alt="boost icon" />}
        onClick={handleNavigateToBoosters}
      >
        Boost
      </Button>
    </div>
  );
};
