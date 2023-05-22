import { AuthorizationData, Token } from '../types';
import { RefreshAuthorisationData } from '../types';
import { url } from '../url';
import { authorizationData } from '../authorisation';
import { refreshAuthorisationData } from '../authorisation';

async function getToken(url: string, authorData: AuthorizationData) {
  const authorDataString = new URLSearchParams(authorData).toString();
  return await fetch(`${url}/2.0/oauth2/password/?${authorDataString}`, {
    method: 'GET',
    headers: {
      'x-secret-key': 'GEU4nvd3rej*jeh.eqp',
    },
  })
    .then((response) => {
      return response.json()
    })
    .then((token: Token) => {
      localStorage.setItem('access_token', token.access_token);
      localStorage.setItem('refresh_token', token.refresh_token);
      localStorage.setItem('ttl', `${token.ttl}`);
    });
};

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
};

async function getAccessToken() {
  if (localStorage.getItem('access_token')) {
    const ttl = localStorage.getItem('ttl')!;
    if (Date.now() / 1000 > +ttl) {
      await updateToken(url, refreshAuthorisationData);
    }
  } else {
    await getToken(url, authorizationData);
  }
  const access_token = localStorage.getItem('access_token')!;
  return access_token;
}

export const token = await getAccessToken();
