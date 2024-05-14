import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import { gameService, soundService } from '@app/services';
import { useServiceState } from '@app/common/state';
import {
  Worm,
  SquadWidget,
  UserStats,
  BottomNav,
  Page,
  FloppyFishBg,
  FloppyFish,
  BotHunter,
  BackButton,
  SoundBtn,
} from '@components';

import { IconButton } from '@ui-kit';
import imgMsgUrl from '@media/msg.png';

import s from './GamePage.module.scss';

interface GamePageProps {
  onClose: () => void;
}

export const GamePage: React.FC<GamePageProps> = ({ onClose }) => {
  const navigate = useNavigate();
  const navigateToLeague = () => navigate('/league');
  const { coords, isTurboActivated } = useServiceState(gameService, [
    'coords',
    'isTurboActivated',
  ]);
  const { muted } = useServiceState(soundService, ['muted']);

  // const [mute, setMute] = useState(false);

  const handleDisableSound = () => {
    // const newMuteState = !mute;

    // setMute(newMuteState);
    soundService.muteAllSound();
  };

  const handleActivate = () => {
    gameService.activateTurboMode();
  };

  const chatLink = () => {
    window.Telegram?.WebApp?.openTelegramLink('https://t.me/wormfarechat');
  };

  useEffect(() => {
    const timerId = setInterval(() => {
      gameService.loop();
    }, 1000);

    gameService.loop();

    return () => {
      clearInterval(timerId);
    };
  }, []);

  return (
    <Page className={s.root}>
      <BackButton onClick={onClose} />
      <SoundBtn
        className={s.soundBtn}
        isSound={muted}
        onSoundless={handleDisableSound}
      />
      {isTurboActivated && <FloppyFishBg className={s.floppyBg} />}
      {coords && (
        <FloppyFish
          className={s.floppyFish}
          positionX={coords.x}
          positionY={coords.y}
          onClick={handleActivate}
        />
      )}
      <BotHunter />
      <div className={s.wrap}>
        <SquadWidget className={s.squad} />
        <IconButton
          icon={<img src={imgMsgUrl} alt="msg icon" />}
          onClick={chatLink}
        />
      </div>

      <UserStats className={s.stats} onClick={navigateToLeague} />
      <div className={s.wormWrap}>
        <Worm />
      </div>
      <BottomNav className={s.bottomNav} />
    </Page>
  );
};
