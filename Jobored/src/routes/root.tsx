import { Outlet, Link } from 'react-router-dom';

export default function Root() {
  return (
    <>
      <nav>
        <ul>
          <li>
            <Link to={``}>Поиск вакансий</Link>
          </li>
          <li>
            <Link to={`/selected`}>Избранное</Link>
          </li>
        </ul>
      </nav>
      <div id="detail">
        <Outlet></Outlet>
      </div>
    </>
  )
}
