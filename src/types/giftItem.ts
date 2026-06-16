export interface GiftItem {
  id: string;
  name: string;
  description: string;
  price: string;
  url: string;
  imageUrl: string;
  claimed: boolean;
  claimedByHash: string | null; // hashed so owner can't identify claimer
}
