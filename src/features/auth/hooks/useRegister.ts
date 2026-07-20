import { useQuery } from '@tanstack/react-query';
import { register } from '../api/auth';
import type { Credentials } from '../types/credentials';

export const useRegister = (credentials: Credentials) => {
  return useQuery({
    queryKey: ['register'],
    queryFn: () => register(credentials),
  });
};
