import { UserBoosts, SlapMode } from '@app/types';


export const getSlapMode = (boosters: UserBoosts[]): SlapMode => {
  const isMultiTapActivated = boosters.some(
    (boost) => boost.type === 'energy_per_tap' && boost.level >= 1,
  );

  if (isMultiTapActivated) {
    return SlapMode.MultiSlap;
  }

  return SlapMode.Default;
};
