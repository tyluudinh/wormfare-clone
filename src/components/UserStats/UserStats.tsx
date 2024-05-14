import React from 'react';
import clsx from 'clsx';

import { CoinsIndicator } from '@components';
import { leagueIcons } from '@app/constants/league';
import { BranchIcon, ArrowIcon as ArrowSvg } from '@app/icons';
import { getLeague } from '@app/services/LeagueService/mappers/league';
import { getOrdinalSuffix } from '@app/utils/getOrdinalSuffix';

import { gameService, userService } from '@services';
import { useServiceState } from '@app/common/state';

import styles from './UserStats.module.scss';

interface UserStatsProps {
  className?: string;
  onClick?: () => void;
}

export const UserStats: React.FC<UserStatsProps> = ({ className, onClick }) => {
  const { manualEarnedScore } = useServiceState(gameService, [
    'manualEarnedScore',
  ]);
  const league = getLeague(manualEarnedScore, false);
  const { userProfile } = useServiceState(userService);

  return (
    <div className={clsx(styles.root, className)}>
      <div onClick={onClick}>
        <CoinsIndicator />
      </div>
      <div onClick={onClick} className={styles.wrap}>
        <span className={styles.placeInLeague}>
          <BranchIcon className={styles.leftBranch} />
          <span className={styles.value}>
            {!userProfile?.rank
              ? '_'
              : userProfile.rank.toLocaleString('en-US')}
            {userProfile?.rank ? getOrdinalSuffix(userProfile.rank) : ''}
          </span>
          <BranchIcon className={styles.rightBranch} />
        </span>
        <div className={styles.leagueWrap}>
          <img
            className={styles.icon}
            src={leagueIcons[league.enum]}
            alt="League Icon"
            width={24}
            height={24}
          />
          <span className={styles.league}>{league.name}</span>
          <ArrowSvg className={styles.arrow} />
        </div>
      </div>
    </div>
  );
};
