import { AuthorizationData, Token } from '../types';
import { url } from '../url';
import { authorizationData } from '../authorisation';

// const [token, setToken] = useState<Token | null>(null);

// const dataUser: AuthorizationData = {
//   login: 'sergei.stralenia@gmail.com',
//   password: 'paralect123',
//   client_id: '2356',
//   client_secret: 'v3.r.137440105.ffdbab114f92b821eac4e21f485343924a773131.06c3bdbb8446aeb91c35b80c42ff69eb9c457948',
//   hr: '0',
// }

// export async function getToken(url: string, authorData: AuthorizationData) {
//   const authorDataString = new URLSearchParams(authorData).toString()
//   await fetch(`${url}/?${authorDataString}`, {
//     method: 'GET',
//     headers: {
//       'x-secret-key': 'GEU4nvd3rej*jeh.eqp',
//     }
//   }).then((response) => response.json()).then((token) => setToken(token))
// }
export async function getToken(url: string, authorData: AuthorizationData) {
  const authorDataString = new URLSearchParams(authorData).toString();
  return await fetch(`${url}/2.0/oauth2/password/?${authorDataString}`, {
    method: 'GET',
    headers: {
      'x-secret-key': 'GEU4nvd3rej*jeh.eqp',
    },
    // }).then((response) => response.json()).then((token: Token) => token.access_token)
  })
    .then((response) => response.json())
    .then((token: Token) => token.access_token);
}

//const responseJson:Token = await response.json()
//.then((response) => response.json()).then((token:Token)=> token.access_token)

export const token = await getToken(url, authorizationData);
// useEffect(() => {
//   getToken(url, dataUser);
//   console.log('надеюсь', token)
// }, []);
