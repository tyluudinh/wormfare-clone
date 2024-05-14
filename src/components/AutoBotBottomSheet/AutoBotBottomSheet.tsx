import React, { useEffect, useState } from 'react';
import { BottomSheet } from '@app/ui-kit';
import { BotRewardWidget } from '../BotRewardWidget';
import { useServiceState } from '@app/common/state';
import { gameService, userService } from '@app/services';

export const AutoBotBottomSheet: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { userProfile } = useServiceState(userService, ['userProfile']);

  useEffect(() => {
    if (userProfile?.autoBotEarnedScore) {
      setIsOpen(true);
    }
  }, [userProfile?.autoBotEarnedScore]);

  const handleClose = () => {
    setIsOpen(false);
    gameService.claimBotReward();
  };

  return (
    <BottomSheet open={isOpen} onClose={handleClose}>
      <BotRewardWidget
        reward={userProfile?.autoBotEarnedScore || 0}
        onClaim={handleClose}
      />
    </BottomSheet>
  );
};
