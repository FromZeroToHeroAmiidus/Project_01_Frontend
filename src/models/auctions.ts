export interface AuctionDataType {
  id: number;
  title: string;
  image: string;
  description: string;
  startingBid: number;
  endTime: Date;
  status: string;
  currentBid: number;
}

export interface AuctionCreateDataType {
  title: string;
  description: string;
  image: string;
  startingBid: number;
  endTime: Date;
}

export interface PostAuctionFields {
  title: string;
  description: string;
  startingBid?: string;
  endTime: Date;
  currentBid?: number;
  image?: string | null; // optional
}

export interface EditAuctionFields {
  title: string;
  description: string;
  startingBid: string;
  endTime: Date;
  currentBid: number;
  image: string | null; // optional
}

export interface AuctionFormValues {
  title: string;
  description: string;
  startingBid?: string;
  endTime: Date | null;
  currentBid?: number;
  image?: string | null;
}
