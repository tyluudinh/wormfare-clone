import { FriendRaw, Friend } from '@app/types';

export const mapFriendRawToFriend = (friendRaw: FriendRaw): Friend => {
  return {
    id: friendRaw.id,
    name: friendRaw.fullName,
    avatarUrl: friendRaw.image,
    slaps: friendRaw.totalEarnedScore,
    bonus: friendRaw.bonusScoreForParentUser,
  };
};
