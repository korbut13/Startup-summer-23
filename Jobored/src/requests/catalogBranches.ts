import { url } from '../url';
import { CatalogBranches } from '../types';

async function getCatalogBranches(url: string) {
  return await fetch(`${url}/2.0/catalogues/`, {
    method: 'GET',
    headers: {
      'x-secret-key': 'GEU4nvd3rej*jeh.eqp',
    },
  })
    .then((response) => response.json())
    .then((response: CatalogBranches[]) => response.map((branch) => branch.title_rus));
}

export const cataloBranches = await getCatalogBranches(url);
