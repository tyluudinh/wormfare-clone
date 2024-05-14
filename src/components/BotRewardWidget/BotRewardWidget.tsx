import React from 'react';
import clsx from 'clsx';

import { RewardItem } from '@components';
import { Button } from '@ui-kit';
import botIcon from '@media/booster/bot.png';

import styles from './BotRewardWidget.module.scss';

interface BotRewardWidgetProps {
  className?: string;
  reward: number;
  isClaming?: boolean;

  onClaim: () => void;
}

export const BotRewardWidget: React.FC<BotRewardWidgetProps> = ({
  className,
  reward,
  isClaming,
  onClaim,
}) => {
  return (
    <div className={clsx(styles.root, className)}>
      <img src={botIcon} className={styles.img} alt="Bot Icon" />

      <div className={styles.contentWrap}>
        <h4 className={styles.title}>At Your Service</h4>
        <p className={styles.subtitle}>Slapping while you're napping</p>
      </div>

      <RewardItem className={styles.reward} value={reward} />

      <Button
        onClick={onClaim}
        disabled={isClaming}
        className={styles.button}
        size="large"
      >
        Claim
      </Button>
    </div>
  );
};
