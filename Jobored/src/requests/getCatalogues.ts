import { url } from "../url";
import { authorizationData } from "../authorisation";
import { Branch } from "../types";

async function getCatalogues() {
  return await fetch(`${url}/2.0/catalogues/`, {
    method: 'GET',
    headers: {
      'x-secret-key': 'GEU4nvd3rej*jeh.eqp',
      'X-Api-App-Id': `${authorizationData.client_secret}`,
    },
  })
    .then((response) => response.json())
    .then((response: Branch[]) => {
      const changedCatalogBranches = response.map((branch) => {
        return {
          label: branch.title_trimmed,
          value: branch.title_trimmed,
          catalogues: branch.key,
        };
      });
      return changedCatalogBranches
    });
}
export const catalogBranchesInit = await getCatalogues();