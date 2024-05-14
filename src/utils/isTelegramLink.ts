export const isTelegramLink = (link: string): boolean => {
  return link.includes('t.me');
};
