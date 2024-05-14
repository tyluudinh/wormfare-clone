import React from 'react';
import clsx from 'clsx';

import { BadgePoints } from '@components';
import wormHeadUrl from '@media/worm-head.png';

import styles from './InviteBonusCard.module.scss';

interface InviteBonusCardProps {
  className?: string;
  bonus: number;
}

export const InviteBonusCard: React.FC<InviteBonusCardProps> = ({
  className,
  bonus,
}) => {
  return (
    <div className={clsx(styles.root, className)}>
      <div className={styles.contentWrap}>
        <p className={styles.title}>Invite Friend</p>
        <div className={styles.wrap}>
          <BadgePoints
            size="small"
            value={bonus}
            className={styles.badge}
            variant="unfilled"
          />
          <p className={styles.desc}>for you and your friend</p>
        </div>
      </div>

      <img
        className={styles.img}
        src={wormHeadUrl}
        alt="Avatar"
        width={40}
        height={59}
      />
    </div>
  );
};
