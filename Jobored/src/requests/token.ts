import { Token } from '../types';
import { RefreshAuthorisationData } from '../types';
import { url } from '../url';
import { authorizationData } from '../authorisation';

async function updateToken(url: string, refreshAuthorData: RefreshAuthorisationData) {
  const refreshAuthorDataString = new URLSearchParams(refreshAuthorData).toString();
  return await fetch(`${url}/2.0/oauth2/refresh_token/?${refreshAuthorDataString}`, {
    method: 'GET',
    headers: {
      'x-secret-key': 'GEU4nvd3rej*jeh.eqp',
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
const defaultAccessToken =
  'v3.r.137440105.38e5e6adf67b93f4aca3d391ebe6fae7068e9838.bdc61b8b343cafc07423910f09ff1eaf6f9c494d';
const defaultRefreshToken =
  'v3.r.137440105.deb036b56e1f469011c1fb60bb195bad88cb5514.30a8ab9d1ce049b512002257cae83b0426492708';

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
