import { AuthorizationData, Token } from '../types';
import { url } from '../url';
import { authorizationData } from '../authorisation';

export async function getToken(url: string, authorData: AuthorizationData) {
  const authorDataString = new URLSearchParams(authorData).toString();
  return await fetch(`${url}/2.0/oauth2/password/?${authorDataString}`, {
    method: 'GET',
    headers: {
      'x-secret-key': 'GEU4nvd3rej*jeh.eqp',
    },
  })
    .then((response) => response.json())
    .then((token: Token) => token.access_token);
}
export const token = await getToken(url, authorizationData);
