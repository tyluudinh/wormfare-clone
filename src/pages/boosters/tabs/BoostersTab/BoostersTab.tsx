import React, { useState } from 'react';

import { BoosterItem, BoosterCard, EmptyListState } from '@components';

import { ListItems, BottomSheet, Skeleton, Toastify } from '@ui-kit';
import { Booster, DailyBooster } from '@app/types';

import { gameService, shopService } from '@services';

import { useServiceState } from '@app/common/state';

import s from './BoostersTab.module.scss';
import { isDailyBooster } from '@app/services/ShopService';

export const BoostersTab = () => {
  const [isOpen, setIsOpen] = React.useState(false);
  const [selectedBooster, setSelectedBooster] = useState<
    Booster | DailyBooster | null
  >(null);

  const [message, setMessage] = useState('');

  const { score } = useServiceState(gameService, ['score']);

  const { boosters, isShopLooding, dailyBoosters } = useServiceState(
    shopService,
    ['isShopLooding', 'boosters', 'dailyBoosters'],
  );

  const handleClose = () => {
    setIsOpen(false);

    setTimeout(() => {
      setSelectedBooster(null);
    }, 400);
  };

  const handleOpen = (booster: Booster | DailyBooster) => {
    setIsOpen(true);
    setSelectedBooster(booster);
  };

  const handleBuyBooster = async (type: string) => {
    try {
      showMessage('Buying booster, please wait...');

      await shopService.buyBooster(type);

      showMessage('Booster purchased successfully!');

      handleClose();
    } catch (error) {
      showMessage('Failed to purchase booster. Please try again.');

      console.error('Error buying booster:', error);
    }
  };

  const handleActivateDailyBooster = async (type: string) => {
    try {
      showMessage('Activating booster, please wait...');

      await shopService.activateDailyBooster(type);

      showMessage('Booster activated successfully!');

      handleClose();
    } catch (error) {
      showMessage('Booster activation failed. Please try again.');

      console.error('Booster activation failed:', error);
    }
  };

  const handleActivate = (booster: Booster | DailyBooster) => {
    if (isDailyBooster(booster)) {
      handleActivateDailyBooster(booster.type);

      return;
    }

    handleBuyBooster(booster.type);
  };

  const showMessage = (message: string) => {
    setMessage(message);
  };

  return (
    <>
      <ListItems
        emptyView={
          <EmptyListState variant="nothing-here" borderRadius="rounded" />
        }
        isLoading={isShopLooding}
        skeleton={<Skeleton variant="item" />}
        className={s.listWrapDaily}
        listClassName={s.list}
        title="Daily Boosters"
        items={dailyBoosters}
        keyExtractor={({ id }) => id.toString()}
        renderItem={(booster) => (
          <BoosterItem
            score={score}
            booster={booster}
            onClick={() => handleOpen(booster)}
          />
        )}
      />
      <ListItems
        emptyView={
          <EmptyListState variant="nothing-here" borderRadius="rounded" />
        }
        isLoading={isShopLooding}
        skeleton={<Skeleton variant="item" />}
        className={s.listWrap}
        listClassName={s.list}
        title="Boosters"
        items={boosters}
        keyExtractor={({ id }) => id.toString()}
        renderItem={(booster) => (
          <BoosterItem score={score} booster={booster} onClick={handleOpen} />
        )}
      />
      <BottomSheet
        className={s.bottomSheet}
        open={isOpen}
        onClose={handleClose}
      >
        {selectedBooster && (
          <BoosterCard
            score={score}
            booster={selectedBooster}
            onActivate={handleActivate}
          />
        )}
      </BottomSheet>
      <Toastify message={message} duration={3000} />
    </>
  );
};
