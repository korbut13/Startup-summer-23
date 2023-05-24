import { AuthorizationData } from './utils/types';

export const authorizationData: AuthorizationData = {
  client_id: import.meta.env.VITE_CLIENT_ID,
  client_secret: import.meta.env.VITE_CLIENT_SECRET,
  hr: import.meta.env.VITE_HR,
};
