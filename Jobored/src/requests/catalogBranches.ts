import { url } from '../url';
import { Branch } from '../types';

async function getCatalogBranches(url: string) {
  return await fetch(`${url}/2.0/catalogues/`, {
    method: 'GET',
    headers: {
      'x-secret-key': 'GEU4nvd3rej*jeh.eqp',
    },
  })
    .then((response) => response.json())
    .then((response: Branch[]) =>
      response.map((branch) => {
        return {
          label: branch.title_rus,
          value: branch.title_rus,
          catalogues: branch.key,
        };
      })
    );
}
export const catalogBranches = await getCatalogBranches(url);
