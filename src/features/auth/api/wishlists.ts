import { api } from '@/utils/apiHelper';

export const findMany = async (): Promise<Response> => {
  return await api('api/wishlists');
};
