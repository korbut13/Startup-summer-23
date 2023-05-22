import { Outlet } from 'react-router-dom';
import HeaderComponent from '../components/header/Header';

export default function Root() {
  return (
    <>
      <HeaderComponent />
      <div id="detail">
        <Outlet></Outlet>
      </div>
    </>
  );
}
