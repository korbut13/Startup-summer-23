import { Outlet } from 'react-router-dom';
import HeaderComponent from '../components/header/Header';

export default function Root() {
  return (
    <>
      <HeaderComponent />
      <div id="detail" style={{ padding: '39px 0px 51px' }}>
        <Outlet></Outlet>
      </div>
    </>
  );
}
