export type View =
  | { type: 'landing' }
  | { type: 'dashboard' }
  | { type: 'create' }
  | { type: 'wishlist'; id: string; asGuest?: boolean; guestToken?: string };
