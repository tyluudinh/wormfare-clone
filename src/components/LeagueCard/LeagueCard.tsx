import React from 'react';
import clsx from 'clsx';

import { LeagueEnum } from '@app/types';
import { leagueBigIcons } from '@app/constants/league';

import styles from './LeagueCard.module.scss';

interface LeagueCardProps {
  className?: string;
  name: string;
  league: LeagueEnum;
  score: number;
  maxScore?: number;
  minScore: number;
  color: string;
  isActive?: boolean;
  belongsToUser?: boolean;
}

function formatNumber(num: number) {
  if (num >= 1e9) {
    return (num / 1e9).toFixed(1).replace(/\.0$/, '') + 'B';
  }

  if (num >= 1e6) {
    return (num / 1e6).toFixed(1).replace(/\.0$/, '') + 'M';
  }

  if (num >= 1e3) {
    return (num / 1e3).toFixed(1).replace(/\.0$/, '') + 'K';
  }

  return num.toString();
}

export const LeagueCard: React.FC<LeagueCardProps> = ({
  className,
  name,
  league = LeagueEnum.Common,
  score,
  maxScore,
  minScore,
  color,
  isActive = false,
  belongsToUser,
}) => {
  const percent = maxScore !== undefined ? (score / maxScore) * 100 : 100;
  const formattedNumber = score.toLocaleString('en-US');
  const classNames = clsx(styles.root, className, styles[league], {
    [styles.active]: isActive,
  });

  const customStyle = {
    '--league-bg-color': color,
  } as React.CSSProperties;

  return (
    <div className={classNames} style={customStyle}>
      <img
        className={styles.logo}
        src={leagueBigIcons[league]}
        alt="League Logo"
      />
      <div className={styles.content}>
        <p className={styles.title}>{name} League</p>
        <p className={styles.value}>
          {belongsToUser && maxScore !== undefined ? (
            <>
              <span>{formattedNumber}</span>
              {' / '}
              <span>{formatNumber(maxScore)}</span>
            </>
          ) : (
            <span>From {formatNumber(minScore)}</span>
          )}
        </p>
      </div>
      {!!percent && (
        <div className={styles.barWrap}>
          {belongsToUser && (
            <div className={styles.bar}>
              <div
                className={styles.barFill}
                style={{ width: `${percent}%` }}
              ></div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
