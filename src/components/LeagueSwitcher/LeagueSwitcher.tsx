import React, { useState, useEffect, useRef } from 'react';

import { Swiper, SwiperSlide, SwiperClass, SwiperRef } from 'swiper/react';
import { Navigation } from 'swiper/modules';
import { LeagueCard } from '@components';

import { League, LeagueEnum, LeagueType } from '@app/types';
import { getLeagueIndex } from '@app/services/LeagueService/mappers/league';
import { leagues } from '@app/constants/league';
import { gameService } from '@services';
import { useServiceState } from '@app/common/state';

import { ArrowLeft, ArrowRight } from '@app/icons';

import styles from './LeagueSwitcher.module.scss';

interface LeagueSwitcherProps {
  leagueType: LeagueType;
  userLeague: LeagueEnum;
  onLeagueChange?: (league: LeagueEnum) => void;
}

export const LeagueSwitcher: React.FC<LeagueSwitcherProps> = ({
  leagueType,
  userLeague,
  onLeagueChange,
}) => {
  const swiperRef = useRef<SwiperRef>(null);

  const { manualEarnedScore } = useServiceState(gameService, [
    'manualEarnedScore',
  ]);

  const activeLeagueIndex = getLeagueIndex(manualEarnedScore);
  const navigationPrevRef = React.useRef(null);
  const navigationNextRef = React.useRef(null);
  const [activeSlideIndex, setActiveSlideIndex] = useState(activeLeagueIndex);

  useEffect(() => {
    const swiper = swiperRef.current?.swiper;

    console.log(swiper);

    swiper?.slideTo(activeLeagueIndex, 0);
  }, [activeLeagueIndex]);

  const handleSlideChange = (swiper: SwiperClass) => {
    const activeIndex = swiper.activeIndex;
    const acitveLeauge = leagues[activeIndex];

    setActiveSlideIndex(activeIndex);
    onLeagueChange?.(acitveLeauge.enum);
  };

  const handleBeforeInit = (swiper: SwiperClass) => {
    if (typeof swiper.params.navigation === 'object') {
      swiper.params.navigation.prevEl = navigationPrevRef.current;
      swiper.params.navigation.nextEl = navigationNextRef.current;
    }
  };

  return (
    <Swiper
      ref={swiperRef}
      modules={[Navigation]}
      className={styles.root}
      cssMode
      spaceBetween={0}
      slidesPerView={1}
      initialSlide={activeSlideIndex}
      navigation={{
        hiddenClass: styles.navDisable,
        disabledClass: styles.navDisable,
        prevEl: navigationPrevRef.current,
        nextEl: navigationNextRef.current,
      }}
      onBeforeInit={handleBeforeInit}
      onSlideChange={handleSlideChange}
    >
      {leagues.map((league, index) => {
        const property: keyof League =
          leagueType === 'slappers' ? 'minProfile' : 'minTeam';

        const currentOrNextLeague =
          leagues[index === activeLeagueIndex ? index + 1 : index];
        const minScore = league[property];
        const maxScore = currentOrNextLeague?.[property];
        const belongsToUser =
          leagueType === 'slappers' ? userLeague === league.enum : false;

        return (
          <SwiperSlide key={league.enum}>
            <LeagueCard
              name={league.name}
              belongsToUser={belongsToUser}
              isActive={index === activeSlideIndex}
              score={manualEarnedScore}
              minScore={minScore}
              maxScore={maxScore}
              league={league.enum}
              color={league.color}
            />
          </SwiperSlide>
        );
      })}
      <button ref={navigationPrevRef} className={styles.prev}>
        <ArrowLeft />
      </button>
      <button ref={navigationNextRef} className={styles.next}>
        <ArrowRight />
      </button>
    </Swiper>
  );
};
