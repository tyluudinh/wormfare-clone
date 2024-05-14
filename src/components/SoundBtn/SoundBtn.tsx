import React from 'react';
import clsx from 'clsx';

import soundOffImgUrl from '@media/sound-off.png';
import soundOnImgUrl from '@media/sound-on.png';

import styles from './SoundBtn.module.scss';

interface SoundBtnProps {
  className?: string;
  isSound: boolean;
  onSoundless: () => void;
}

export const SoundBtn: React.FC<SoundBtnProps> = ({
  className,
  isSound,
  onSoundless,
}) => {
  return (
    <button
      className={clsx(styles.root, className, {
        [styles.soundOff]: !isSound,
      })}
      onClick={onSoundless}
    >
      {isSound ? (
        <img className={styles.img} src={soundOnImgUrl} alt="sound-on" />
      ) : (
        <img className={styles.img} src={soundOffImgUrl} alt="sound-off" />
      )}
    </button>
  );
};
