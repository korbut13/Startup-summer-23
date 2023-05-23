import React from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Root from './routes/root';
import './index.css';
import JobSearchPage from './routes/jobSearch_page';
import ErrorPage from './routes/error-page';
import FavoritesVacanciesPage from './routes/favorites_page';
import VacancyPage from './routes/vacancy_page';

export enum AppRoutes {
  ROOT = '/',
  FAVORITES = '/favorites',
  VACANCY = '/vacancy',
}

const router = createBrowserRouter([
  {
    path: '/',
    element: <Root />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: AppRoutes.ROOT,
        element: <JobSearchPage />,
      },
      {
        path: AppRoutes.FAVORITES,
        element: <FavoritesVacanciesPage />,
      },
      {
        path: AppRoutes.VACANCY,
        element: <VacancyPage />,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
