import type { User } from '@/types/user';

export const MOCK_USERS: Record<string, Omit<User, 'id'>> = {
  google: {
    name: 'Emma Thornton',
    email: 'emma@gmail.com',
    avatar: '',
    provider: 'google',
  },
  github: {
    name: 'Luca Ferreira',
    email: 'luca@github.com',
    avatar: '',
    provider: 'github',
  },
  facebook: {
    name: 'Sophie Marceau',
    email: 'sophie@facebook.com',
    avatar: '',
    provider: 'facebook',
  },
};
