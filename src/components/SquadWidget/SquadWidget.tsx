import React from 'react';
import { useNavigate } from 'react-router-dom';
import clsx from 'clsx';

import { BadgePoints } from '@components';

import { userService } from '@services';

import { ArrowIcon as ArrowSvg } from '@app/icons';
import defaultLogo from '@media/avatar.png';

import styles from './SquadWidget.module.scss';
import { useServiceState } from '@app/common/state';

interface SquadWidgetProps {
  className?: string;
}

export const SquadWidget: React.FC<SquadWidgetProps> = ({ className }) => {
  const navigate = useNavigate();
  const { userProfile } = useServiceState(userService);

  const navigateToSquad = () => {
    if (userProfile?.squad) {
      navigate(`/squads/${userProfile.squad.id}`);
    } else {
      navigate('/squads');
    }
  };

  if (!userProfile?.squad) {
    return (
      <div onClick={navigateToSquad} className={clsx(styles.join, className)}>
        <span className={styles.title}>Join Squad</span>
        <ArrowSvg className={styles.icon} />
      </div>
    );
  }

  const { name, totalEarnedScore, image } = userProfile.squad;

  return (
    <div onClick={navigateToSquad} className={clsx(styles.root, className)}>
      <div className={styles.content}>
        <img
          className={styles.img}
          src={image || defaultLogo}
          alt="Squad logo"
          width={48}
          height={48}
        />
        <div className={styles.wrap}>
          <p className={styles.name}>{name}</p>
          <BadgePoints variant="unfilled" value={totalEarnedScore} />
        </div>
      </div>
    </div>
  );
};
