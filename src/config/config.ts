export const getBackendUrl = () => {
  const url = import.meta.env.VITE_BACKEND_URL as string;
  if (!url) {
    throw new Error('Backend URL variable is not set');
  }
  return url;
};
