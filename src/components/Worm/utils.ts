export const isSingleTouch = (
  event: React.TouchEvent<HTMLDivElement>,
): boolean => {
  if (event.touches.length === 1) {
    return true;
  }

  return false;
};

export const getTapSide = (
  event: React.TouchEvent<HTMLDivElement>,
): 'left' | 'right' | 'both' => {
  const x = event.touches[0].clientX;
  //  - wormRect.left;
  const width = window.innerWidth;

  if (x > (width / 3) * 2 && isSingleTouch(event)) {
    return 'right';
  }

  if (x < (width / 3) * 2 && isSingleTouch(event)) {
    return 'left';
  }

  return 'both';
};

export const getSkin = (skinId?: number) => {
  switch (skinId) {
    case 1:
      return 'default';
    case 2:
      return 'watermelon';
    case 3:
      return 'notcoin';
    case 4:
      return 'cheeky';

    default:
      return 'default';
  }
};
