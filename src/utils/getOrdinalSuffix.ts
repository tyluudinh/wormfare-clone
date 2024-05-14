export function getOrdinalSuffix(number: number) {
  if (number === 11 || number === 12 || number === 13) {
    return 'th';
  } else {
    const lastDigit = number % 10;

    switch (lastDigit) {
      case 1:
        return 'st';
      case 2:
        return 'nd';
      case 3:
        return 'rd';
      default:
        return 'th';
    }
  }
}
