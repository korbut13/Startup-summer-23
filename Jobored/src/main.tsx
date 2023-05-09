import React from 'react';
import ReactDOM from 'react-dom/client';
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import Root from './routes/Root';
import './index.css';
import JobSearchPage from './routes/jobSearch_page';
import ErrorPage from './routes/error-page';
import SelectedVacanciesPage from './routes/selected_page';


const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: '',
        element: <JobSearchPage />,
      },
      {
        path: 'selected',
        element: <SelectedVacanciesPage />,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)
