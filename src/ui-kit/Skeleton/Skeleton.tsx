import React from 'react';
import styles from './Skeleton.module.scss';

interface SkeletonProps {
  className?: string;
  variant: 'squadItem' | 'friendItem' | 'userItem' | 'item';
}

export const Skeleton: React.FC<SkeletonProps> = ({ variant }) => {
  return (
    <>
      {variant === 'squadItem' && (
        <div className={styles.squadItem}>
          <div className={styles.img}></div>
          <div className={styles.wrap}>
            <div className={styles.name}></div>
            <div className={styles.league}></div>
          </div>
        </div>
      )}
      {variant === 'friendItem' && (
        <div className={styles.friendItem}>
          <div className={styles.container}>
            <div className={styles.img}></div>
            <div className={styles.wrap}>
              <div className={styles.name}></div>
              <div className={styles.slaps}></div>
            </div>
          </div>

          <div className={styles.bonus}></div>
        </div>
      )}
      {variant === 'userItem' && (
        <div className={styles.userItem}>
          <div className={styles.number}></div>
          <div className={styles.img}></div>
          <div className={styles.wrap}>
            <div className={styles.name}></div>
            <div className={styles.slaps}></div>
          </div>
        </div>
      )}
      {variant === 'item' && (
        <div className={styles.item}>
          <div className={styles.wrap}>
            <div className={styles.slaps}></div>
            <div className={styles.name}></div>
            <div className={styles.desc}></div>
          </div>
          <div className={styles.img}></div>
        </div>
      )}
    </>
  );
};
