import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { BottomSheet } from '@app/ui-kit';
import { useServiceState } from '@app/common/state';
import { cheatСodeService } from '@app/services';
import { CheatcodeCard } from '@components';

export const CheatCodeBottomSheet: React.FC = () => {
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  const { activatedCode } = useServiceState(cheatСodeService);
  const handleNavigateToSkin = () => {
    navigate('/boosters?tab=skins&scroll=bottom');
    setIsOpen(false);
  };

  useEffect(() => {
    if (activatedCode) {
      setIsOpen(true);
    }
  }, [activatedCode]);

  const handleClose = () => {
    setIsOpen(false);
  };

  return (
    <BottomSheet open={isOpen} onClose={handleClose}>
      {activatedCode && (
        <CheatcodeCard
          data={activatedCode?.data}
          onClick={handleNavigateToSkin}
        />
      )}
    </BottomSheet>
  );
};
