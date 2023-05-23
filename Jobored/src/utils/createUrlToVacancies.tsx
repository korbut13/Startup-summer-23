import qs from 'qs';

import { url } from './url';
import { InitialDataFilters } from './types';

const ITEMS_PER_PAGE = 4;

export default function createUrlToVacancies(dataFilters: InitialDataFilters, activePage: number) {
  const queryString = qs.stringify({
    page: activePage - 1,
    count: ITEMS_PER_PAGE,
    ...((dataFilters.payment_from.length > 0 || dataFilters.payment_to.length > 0) && {
      no_agreement: 1,
    }),
    ...dataFilters,
  });

  const pathUrl = `${url}/2.0/vacancies/?${queryString}`;
  return pathUrl;
}
