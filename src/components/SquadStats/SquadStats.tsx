import React from 'react';
import { useNavigate } from 'react-router-dom';
import clsx from 'clsx';

import { Button } from '@ui-kit';
import { BadgePoints } from '@components';

import wormHeadUrl from '@media/worm-head.png';

import styles from './SquadStats.module.scss';

interface SquadStatsProps {
  className?: string;
  isJoined?: boolean;
  slaps: number;
  members: number;
  onJoin?: () => void;
  onLeave?: () => void;
}

export const SquadStats: React.FC<SquadStatsProps> = ({
  className,
  isJoined = false,
  slaps,
  members,
  onJoin,
  onLeave,
}) => {
  const navigate = useNavigate();

  const handleShowAll = () => {
    navigate('/squads');
  };

  return (
    <div className={clsx(styles.root, className)}>
      <div className={styles.wrap}>
        <div className={styles.numberOfPoints}>
          <BadgePoints value={slaps} variant="unfilled" />
          <span className={styles.label}>slapped in squad</span>
        </div>

        <div className={styles.numberOfPlayers}>
          <img
            className={styles.playersIcon}
            src={wormHeadUrl}
            width={32}
            height={40}
            alt="Players Icon"
          />
          <span className={styles.number}>
            {members.toLocaleString('en-US')}
          </span>
          <span className={styles.label}>players</span>
        </div>
      </div>
      <div className={styles.btnGroup}>
        <Button className={styles.btn} onClick={handleShowAll}>
          All squads
        </Button>
        {isJoined ? (
          <Button className={styles.btn} onClick={onLeave}>
            Leave Squad
          </Button>
        ) : (
          <Button className={styles.btn} onClick={onJoin}>
            Join Squad
          </Button>
        )}
      </div>
    </div>
  );
};
