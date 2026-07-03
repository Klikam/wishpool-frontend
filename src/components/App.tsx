import { useCallback, useState } from 'react';

import { UserNullableSchema, type User } from '@/types/user';
import type { View } from '@/types/view';

import { storageHelper } from '@/utils/storageHelper';

import CreateWishlist from './pages/CreateWishlist';
import Dashboard from './pages/Dashboard';
import LandingPage from './pages/LandingPage';
import WishlistView from './pages/WishlistView';
import z from 'zod';

// ── App Shell ─────────────────────────────────────────────────────────────────

export default function App() {
  const [currentUser, setCurrentUser] = useState<User | null>(() =>
    storageHelper.load(
      storageHelper.STORAGE_KEYS.currentUser,
      null,
      UserNullableSchema,
    ),
  );
  const [guestToken] = useState<string>(() => {
    let t = storageHelper.load<string>(
      storageHelper.STORAGE_KEYS.guestToken,
      '',
      z.string(),
    );
    if (!t) {
      t = storageHelper.genId() + storageHelper.genId();
      storageHelper.save(storageHelper.STORAGE_KEYS.guestToken, t);
    }
    return t;
  });
  const [view, setView] = useState<View>(() => {
    // check for ?list= param to deep link
    const params = new URLSearchParams(window.location.search);
    const listId = params.get('list');
    if (listId) return { type: 'wishlist', id: listId };
    return { type: currentUser ? 'dashboard' : 'landing' };
  });

  const navigate = useCallback((v: View) => {
    setView(v);
  }, []);

  function handleLogin(user: User) {
    storageHelper.save(storageHelper.STORAGE_KEYS.currentUser, user);
    setCurrentUser(user);
    setView({ type: 'dashboard' });
  }

  function handleLogout() {
    storageHelper.save(storageHelper.STORAGE_KEYS.currentUser, null);
    setCurrentUser(null);
    setView({ type: 'landing' });
  }

  if (view.type === 'landing') {
    return <LandingPage onLogin={handleLogin} />;
  }

  if (view.type === 'create' && currentUser) {
    return (
      <CreateWishlist
        currentUser={currentUser}
        onCreated={id => {
          navigate({ type: 'wishlist', id });
        }}
        onCancel={() => {
          navigate({ type: 'dashboard' });
        }}
      />
    );
  }

  if (view.type === 'wishlist') {
    return (
      <WishlistView
        wishlistId={view.id}
        currentUser={currentUser}
        guestToken={guestToken}
        onBack={() => {
          navigate(currentUser ? { type: 'dashboard' } : { type: 'landing' });
        }}
      />
    );
  }

  if (view.type === 'dashboard' && currentUser) {
    return (
      <Dashboard
        currentUser={currentUser}
        onNavigate={navigate}
        onLogout={handleLogout}
      />
    );
  }

  return <LandingPage onLogin={handleLogin} />;
}
