import { url } from '../utils/url';
import { authorizationData } from '../authorisation';
import { Branch } from '../utils/types';

async function getCatalogues() {
  return await fetch(`${url}/2.0/catalogues/`, {
    method: 'GET',
    headers: {
      'x-secret-key': import.meta.env.VITE_X_SECRET_KEY,
      'X-Api-App-Id': `${authorizationData.client_secret}`,
    },
  })
    .then((response) => response.json())
    .then((response: Branch[]) => {
      const changedCatalogBranches = response.map((branch) => {
        return {
          label: branch.title_rus,
          value: branch.title_rus,
          catalogues: branch.key,
        };
      });
      return changedCatalogBranches;
    });
}
export const catalogBranchesInit = await getCatalogues();
