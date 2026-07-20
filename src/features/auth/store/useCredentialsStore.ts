import { create } from 'zustand';
import type { Mode } from '../types/credentials';

interface CredentialsStore {
  mode: Mode;
  actions: {
    changeMode: (mode: Mode) => void;
  };
}

export const useCredentialsStore = create<CredentialsStore>((set) => ({
  mode: 'signin',
  actions: {
    changeMode: (mode) => {
      set({ mode });
    },
  },
}));
