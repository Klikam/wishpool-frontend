import { authClient } from '../lib/auth-client';
import type { Credentials } from '../types/credentials';

export const register = async (credentials: Credentials) => {
  const { data, error } = await authClient.signUp.email({
    name: credentials.name,
    email: credentials.email,
    password: credentials.password,
  });
  if (error) return error.message;
  return data.user.name;
};
