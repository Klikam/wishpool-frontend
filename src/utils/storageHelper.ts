export const storageHelper = {
  STORAGE_KEYS: {
    users: 'wishpool_users',
    wishlists: 'wishpool_wishlists',
    currentUser: 'wishpool_current_user',
    guestToken: 'wishpool_guest_token',
  },

  load<T>(key: string, fallback: T): T {
    try {
      const raw = localStorage.getItem(key);
      return raw ? JSON.parse(raw) : fallback;
    } catch {
      return fallback;
    }
  },

  save(key: string, value: unknown) {
    localStorage.setItem(key, JSON.stringify(value));
  },

  genId() {
    return Math.random().toString(36).slice(2, 10);
  },

  hashToken(token: string): string {
    let h = 0;
    for (let i = 0; i < token.length; i++) {
      h = (Math.imul(31, h) + token.charCodeAt(i)) | 0;
    }
    return Math.abs(h).toString(16);
  },
};
