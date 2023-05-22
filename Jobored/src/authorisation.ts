import { AuthorizationData } from './types';
import { RefreshAuthorisationData } from './types';

export const authorizationData: AuthorizationData = {
  login: 'sergei.stralenia@gmail.com',
  password: 'paralect123',
  client_id: '2356',
  client_secret:
    'v3.r.137440105.ffdbab114f92b821eac4e21f485343924a773131.06c3bdbb8446aeb91c35b80c42ff69eb9c457948',
  hr: '0',
};

export const refreshAuthorisationData: RefreshAuthorisationData = {
  refresh_token: localStorage.getItem('refresh_token')!,
  client_id: authorizationData.client_id,
  client_secret: authorizationData.client_secret
}
