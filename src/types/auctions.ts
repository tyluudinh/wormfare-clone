export interface Auction {
  pastWinners?: AuctionWinner[];
  bidders?: AuctionBidder[];
  endDate?: Date;
}

export interface AuctionWinner {
  userId: number;
  user: {
    fullName: string;
    image: string;
  };
  tokenAmount?: string;
  date: string;
}

export interface AuctionBidder extends AuctionWinner {
  id: number;
  fullName: string;
  image: string;
}