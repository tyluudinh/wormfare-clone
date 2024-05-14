import React from 'react';
import clsx from 'clsx';

import { getSlapMode } from '@app/utils';
import { slapModeIcons } from '@app/constants/boosters';
import { SlapMode } from '@app/types';

import { userService } from '@services';
import { useServiceState } from '@app/common/state';

import styles from './SlapsIndicator.module.scss';
import { StrokeText } from '@app/ui-kit';

interface SlapsIndicatorProps {
  className?: string;
  slapsValue: number;
}

export const SlapsIndicator: React.FC<SlapsIndicatorProps> = ({
  className,
  slapsValue,
}) => {
  const { userProfile } = useServiceState(userService, ['userProfile']);
  const slapMode: SlapMode = getSlapMode(userProfile?.boosts || []);
  const classNames = clsx(styles.root, className, styles[slapMode]);
  const formattedValue = slapsValue.toLocaleString('en-US');

  return (
    <div className={classNames}>
      <img
        className={styles.img}
        src={slapModeIcons[slapMode]}
        alt="slap cover"
      />
      <StrokeText className={styles.value} text={formattedValue} />
      <StrokeText className={styles.label} text="Slaps" />
    </div>
  );
};
