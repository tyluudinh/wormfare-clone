import React, { useMemo } from 'react';
import clsx from 'clsx';

import { Button } from '@ui-kit';
import { BadgePoints, Timer } from '@components';
import { getOrdinalSuffix } from '@app/utils/getOrdinalSuffix';
import { formatEther } from '@ethersproject/units';

import styles from './AuctionStats.module.scss';
import { BranchIcon } from '@app/icons';

interface AuctionStatsProps {
  className?: string;
  name: string;
  rank?: number;
  bid?: string;
  endDate?: Date;
  onClick?: () => void;
  onFinish: () => void;
}

export const AuctionStats: React.FC<AuctionStatsProps> = ({
  className,
  bid,
  name,
  rank,
  endDate,
  onClick,
  onFinish,
}) => {
  const endAuctionDate = useMemo(
    () => new Date(endDate || Date.now()),
    [endDate],
  );

  return (
    <div className={clsx(styles.root, className)}>
      <div className={styles.wrap}>
        <div className={styles.stats}>
          <span className={styles.label}>{name}</span>
          {bid && rank && (
            <div className={styles.placeInAuction}>
              <BadgePoints value={parseInt(formatEther(bid))} variant="wofr" />
              <BranchIcon className={styles.leftBranch} />
              <span className={styles.rank}>
                {!rank ? '_' : rank.toLocaleString('en-US')}
                {rank ? getOrdinalSuffix(rank) : ''}
              </span>
              <BranchIcon className={styles.rightBranch} />
            </div>
          )}
        </div>

        <div className={styles.timer}>
          <span className={styles.label}>Until the end</span>
          {endDate && <Timer endDate={endAuctionDate} onFinish={onFinish} />}
        </div>
      </div>
      <Button className={styles.btn} onClick={onClick} size="large">
        Get WOFR TO WIN
      </Button>
    </div>
  );
};
