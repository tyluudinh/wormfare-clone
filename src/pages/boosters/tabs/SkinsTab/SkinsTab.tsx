import React from 'react';

import { SkinItem, EmptyListState, SkinCard } from '@components';

import { ListItems, BottomSheet, Toastify, Skeleton } from '@ui-kit';
import { SkinRaw } from '@app/types';

import { shopService, userService } from '@services';
import { useServiceState } from '@app/common/state';

import s from './SkinsTab.module.scss';

export const SkinsTab = () => {
  const { skins, isShopLooding } = useServiceState(shopService);
  const [isOpen, setIsOpen] = React.useState(false);
  const [selectedSkin, setSelectedSkin] = React.useState<SkinRaw | null>(null);
  const [message, setMessage] = React.useState('');

  const { userProfile } = useServiceState(userService, ['userProfile']);

  const handleClose = () => {
    setIsOpen(false);

    setTimeout(() => {
      setSelectedSkin(null);
    }, 400);
  };

  const handleOpen = (skin: SkinRaw) => {
    setIsOpen(true);
    setSelectedSkin(skin);
  };

  const handleBuySkin = async (id: number) => {
    try {
      showMessage('Buying skin, please wait...');

      await shopService.buySkin(id);

      showMessage('Skin purchased successfully!');

      handleClose();
    } catch (error) {
      showMessage('Error buying skin. Please try again.');

      console.error('Error buying skin:', error);
    }
  };

  const handleActivateSkin = async (skinId: number) => {
    try {
      showMessage('Activating skin, please wait...');

      await shopService.activateSkins(skinId);

      showMessage('Skin activated successfully!');

      handleClose();
    } catch (error) {
      showMessage('Skin activation failed. Please try again.');

      console.error('Skin activation failed:', error);
    }
  };

  const handleActivate = (skin: SkinRaw) => {
    handleActivateSkin(skin.id);
  };

  const showMessage = (message: string) => {
    setMessage(message);
  };

  const activatedSkinId = userProfile?.skinId || 1;

  return (
    <>
      <ListItems
        emptyView={
          <EmptyListState variant="nothing-here" borderRadius="rounded" />
        }
        className={s.listWrap}
        isLoading={isShopLooding}
        skeleton={<Skeleton variant="item" />}
        listClassName={s.list}
        title="Skins"
        items={skins}
        keyExtractor={({ id }) => id.toString()}
        renderItem={(skin) => (
          <SkinItem
            isActivate={activatedSkinId === skin.id}
            skin={skin}
            onClick={() => handleOpen(skin)}
            score={skin.price}
          />
        )}
      />
      <BottomSheet
        className={s.bottomSheet}
        open={isOpen}
        onClose={handleClose}
      >
        {selectedSkin && (
          <SkinCard
            isActivate={activatedSkinId === selectedSkin.id}
            score={selectedSkin.price}
            skin={selectedSkin}
            onActivate={handleActivate}
            onBuy={() => handleBuySkin(selectedSkin.id)}
          />
        )}
      </BottomSheet>
      <Toastify message={message} duration={3000} />
    </>
  );
};
