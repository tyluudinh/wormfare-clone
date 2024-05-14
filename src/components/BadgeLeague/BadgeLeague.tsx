import React from 'react';
import clsx from 'clsx';

import { leagueIcons } from '@app/constants/league';
import { LeagueEnum } from '@app/types';

import { capitalizeFirstLetter } from '@utils';

import styles from './BadgeLeague.module.scss';

interface BadgeLeagueProps {
  className?: string;
  league: LeagueEnum;
}

export const BadgeLeague: React.FC<BadgeLeagueProps> = ({
  className,
  league,
}) => {
  const classNames = clsx(styles.root, className);

  return (
    <div className={classNames}>
      <img
        className={styles.icon}
        src={leagueIcons[league]}
        alt="League Icon"
      />
      <span className={styles.title}>
        {capitalizeFirstLetter(league as string)}
      </span>
    </div>
  );
};
