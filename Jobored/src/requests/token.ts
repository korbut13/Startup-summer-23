import { Token } from '../utils/types';
import { RefreshAuthorisationData } from '../utils/types';
import { url } from '../utils/url';
import { authorizationData } from '../authorisation';

async function updateToken(url: string, refreshAuthorData: RefreshAuthorisationData) {
  const refreshAuthorDataString = new URLSearchParams(refreshAuthorData).toString();
  return await fetch(`${url}/2.0/oauth2/refresh_token/?${refreshAuthorDataString}`, {
    method: 'GET',
    headers: {
      'x-secret-key': import.meta.env.VITE_X_SECRET_KEY,
    },
  })
    .then((response) => response.json())
    .then((token: Token) => {
      localStorage.setItem('access_token', token.access_token);
      localStorage.setItem('refresh_token', token.refresh_token);
      localStorage.setItem('ttl', `${token.ttl}`);
    });
}

const defaultTtl = 1685360849;
const defaultAccessToken = import.meta.env.VITE_DEFAULT_ACCESS_TOKEN;
const defaultRefreshToken = import.meta.env.VITE_DEFAULT_REFRESH_TOKEN;

const refreshAuthorisationData: RefreshAuthorisationData = {
  refresh_token: localStorage.getItem('refresh_token') || defaultRefreshToken,
  client_id: authorizationData.client_id,
  client_secret: authorizationData.client_secret,
};

async function getAccessToken() {
  const actualAccessToken = localStorage.getItem('access_token') || defaultAccessToken;
  const actualTtl = localStorage.getItem('ttl') || defaultTtl;
  if (Date.now() / 1000 > +actualTtl) {
    await updateToken(url, refreshAuthorisationData);
  }
  return actualAccessToken;
}

export const token = await getAccessToken();
