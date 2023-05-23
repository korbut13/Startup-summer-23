import qs from 'qs';
import { InitialInputValues } from '../types';
import { InitialDataFilters } from '../types';
import { BranchParams } from '../types';

export default function setInitValuesFromUrl(
  initialInputValues: InitialInputValues,
  initialDataFilters: InitialDataFilters,
  branches: BranchParams[],
  initialActivePage: { activePage: number }
) {
  const params = qs.parse(window.location.search.substring(1));
  for (const key in params) {
    if (key === 'catalogues') {
      const selectedBranch = branches.filter(
        (elem) => elem.catalogues === Number(params.catalogues)
      )[0].value;
      initialInputValues[key as keyof typeof initialInputValues] = selectedBranch as string;
      initialDataFilters.catalogues = params.catalogues as string;
    } else if (key === 'activePage') {
      initialActivePage.activePage = Number(params.activePage);
    } else {
      initialInputValues[key as keyof typeof initialInputValues] = params[
        key as keyof typeof params
      ] as string;
      initialDataFilters[key as keyof typeof initialDataFilters] = params[
        key as keyof typeof params
      ] as string;
    }
  }
}
