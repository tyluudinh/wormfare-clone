import React from 'react';
import clsx from 'clsx';

import { BadgeLeague, SquadStats } from '@components';
import { LeagueEnum } from '@app/types';

import defaultSquadLogo from '@media/avatar.png';
import { ExternalLinkIcon as ExternalLink } from '@app/icons';

import styles from './SquadCard.module.scss';

interface SquadCardProps {
  className?: string;
  league: LeagueEnum;
  logo?: string;
  name: string;
  slaps: number;
  members: number;
  isJoined: boolean;
  onClick?: () => void;
  onJoin?: () => void;
  onLeave?: () => void;
}

export const SquadCard: React.FC<SquadCardProps> = ({
  className,
  league,
  logo,
  name,
  slaps,
  members,
  isJoined,
  onClick,
  onJoin,
  onLeave,
}) => {
  return (
    <div className={clsx(styles.root, className)}>
      <div className={styles.wrap}>
        <img
          className={styles.img}
          src={logo || defaultSquadLogo}
          alt="Avatar of the squad"
          width={100}
          height={100}
        />
        <p className={styles.name} onClick={onClick}>
          {name}
          <ExternalLink className={styles.externalLinkIcon} />
        </p>
        {league && <BadgeLeague league={league} />}
      </div>
      <SquadStats
        className={styles.stats}
        slaps={slaps}
        members={members}
        onJoin={onJoin}
        onLeave={onLeave}
        isJoined={isJoined}
      />
    </div>
  );
};
