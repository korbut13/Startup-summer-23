import { Outlet } from 'react-router-dom';
import HeaderComponent from '../components/header/Header';

export default function Root() {
  return (
    <>
      <HeaderComponent />
      {/* <nav>
        <ul>
          <li>
            <Link to={``}>Поиск вакансий</Link>
          </li>
          <li>
            <Link to={`/selected`}>Избранное</Link>
          </li>
        </ul>
      </nav> */}
      <div id="detail">
        <Outlet></Outlet>
      </div>
    </>
  );
}
