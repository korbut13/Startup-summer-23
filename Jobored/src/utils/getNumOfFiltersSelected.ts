import qs from 'qs';
export default function getNumOfFiltersSelected() {
  const params = qs.parse(window.location.search.substring(1));
  const keysParams = Object.keys(params);
  return keysParams.length - 1;
}
