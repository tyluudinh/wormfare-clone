import React from 'react';
import clsx from 'clsx';

import { LeagueEnum } from '@app/types';
import { BadgeLeague, BadgePoints } from '@components';

import defaultSquadLogo from '@media/avatar.png';

import styles from './SquadItem.module.scss';

interface SquadItemProps {
  className?: string;
  name: string;
  logo?: string;
  league?: LeagueEnum;
  index?: number;
  slaps?: number;
  onClick?: () => void;
}

export const SquadItem: React.FC<SquadItemProps> = ({
  className,
  name,
  logo,
  league,
  index,
  slaps,
  onClick,
}) => {
  return (
    <div
      onClick={onClick}
      className={clsx(styles.root, className, styles[league as string])}
    >
      {index && <div className={styles.index}>{index}</div>}
      <img
        className={styles.logo}
        src={logo || defaultSquadLogo}
        alt="Avatar of the squad"
        width={48}
        height={48}
      />

      <div className={styles.wrap}>
        <p className={styles.name}>{name}</p>
        {league && <BadgeLeague league={league} />}
        {slaps && (
          <BadgePoints
            variant="unfilled"
            size="small"
            value={slaps as number}
            className={styles.badge}
          />
        )}
      </div>
    </div>
  );
};
