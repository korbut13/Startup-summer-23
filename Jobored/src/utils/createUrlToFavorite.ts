import { url } from './url';
export default function createUrlToFavotite(idsVacancies: number[], activePage: number) {
  let path = `${url}/2.0/vacancies/?page=${activePage - 1}&count=4&`;
  for (const id of idsVacancies) {
    path = path + `ids[]=${id}&`;
  }
  return path.slice(0, -1);
}
