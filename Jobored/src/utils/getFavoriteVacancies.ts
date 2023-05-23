export const getFavoriteVacancies = () => {
  return JSON.parse(localStorage.getItem('favoriteVacancies') || '[]');
};
