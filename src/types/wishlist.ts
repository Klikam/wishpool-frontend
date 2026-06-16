import type { GiftItem } from './giftItem';

export interface Wishlist {
  id: string;
  ownerId: string;
  ownerName: string;
  title: string;
  occasion: string;
  date: string;
  description: string;
  gifts: GiftItem[];
  createdAt: string;
}
