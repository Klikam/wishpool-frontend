import { create } from 'zustand';
import type { Credentials, Mode } from '../types/credentials';

const initialEmailForm: Credentials = {
  name: '',
  email: '',
  password: '',
};

interface EmailPasswordStore {
  mode: Mode;
  emailForm: Credentials;
  emailError: string;
  actions: {
    setEmailForm: (emailForm: Credentials) => void;
    setEmailError: (emailError: string) => void;
    changeMode: (mode: Mode) => void;
    reset: () => void;
  };
}

export const useEmailPasswordStore = create<EmailPasswordStore>(set => ({
  mode: 'signin',
  emailForm: initialEmailForm,
  emailError: '',
  actions: {
    setEmailForm: emailForm => {
      set({ emailForm });
    },
    setEmailError: emailError => {
      set({ emailError });
    },
    changeMode: mode => {
      set({ mode, emailError: '' });
    },
    reset: () => {
      set({ mode: 'signin', emailForm: initialEmailForm, emailError: '' });
    },
  },
}));
