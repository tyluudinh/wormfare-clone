export function generateCoordinates(
  screenWidth: number,
  screenHeight: number,
  excludingArea: [number, number, number, number],
  objectSize: [number, number],
) {
  const excludeX = excludingArea[0] * screenWidth;
  const excludeY = excludingArea[1] * screenHeight;
  const excludeWidth = excludingArea[2] * screenWidth;
  const excludeHeight = excludingArea[3] * screenHeight;

  const maxX = screenWidth - objectSize[0];
  const maxY = screenHeight - objectSize[1];

  // Calculate available regions (above, below, left, right) of the exclusion area
  const regions = [
    {
      weight: excludeX,
      generate: () => ({
        x: Math.random() * (excludeX - objectSize[0]),
        y: Math.random() * maxY,
      }),
    }, // Left
    {
      weight: screenWidth - (excludeX + excludeWidth),
      generate: () => ({
        x:
          Math.random() * (maxX - (excludeX + excludeWidth)) +
          (excludeX + excludeWidth),
        y: Math.random() * maxY,
      }),
    }, // Right
    {
      weight: excludeY,
      generate: () => ({
        x: Math.random() * maxX,
        y: Math.random() * (excludeY - objectSize[1]),
      }),
    }, // Above
    {
      weight: screenHeight - (excludeY + excludeHeight),
      generate: () => ({
        x: Math.random() * maxX,
        y:
          Math.random() * (maxY - (excludeY + excludeHeight)) +
          (excludeY + excludeHeight),
      }),
    }, // Below
  ];

  // Adjust weights based on area and select a region to generate coordinates
  const totalWeight = regions.reduce((acc, region) => acc + region.weight, 0);
  let randomWeight = Math.random() * totalWeight;

  for (const region of regions) {
    randomWeight -= region.weight;

    if (randomWeight <= 0) {
      return region.generate();
    }
  }

  // Fallback to the first region's generator in case of rounding errors
  return regions[0].generate();
}
