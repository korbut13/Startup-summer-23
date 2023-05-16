import { url } from "../url";
import { InitialDataFilters } from "../types";

export default function createUrlString(
  dataFilters: InitialDataFilters,
  activePage: number,
) {
  let pathUrl = `${url}/2.0/vacancies/?page=${activePage - 1}&count=4&`;
  pathUrl = dataFilters.payment_from.length > 0 || dataFilters.payment_to.length > 0 ? pathUrl + 'no_agreement=1&' : pathUrl;

  for (const key in dataFilters) {
    if (
      dataFilters[key as keyof typeof dataFilters] &&
      dataFilters[key as keyof typeof dataFilters] != '0'
    ) {
      pathUrl = pathUrl + `${key}=${dataFilters[key as keyof typeof dataFilters]}&`;
    } pathUrl;
  }
  return pathUrl.slice(0, -1);
}
