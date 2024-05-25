import Home from './../pages/Home'
import Detail from './../pages/Detail'
import { Route, Routes, useLocation} from 'react-router-dom'
import { CssBaseline } from '@mui/material';
import { useMediaQuery } from '@mui/material';
import LeftSideNav from './../componets/SideNav';
import BottomNav from './../componets/BottomNavigation';

const Layout = () => {
  const isXS = useMediaQuery('(max-width:600px)');
const location = useLocation();

  return (
    <>
    <CssBaseline />
    {!isXS ? <LeftSideNav />:!location.pathname.includes('detail') && <BottomNav />}
    <main style={{ marginLeft: isXS ? 0 : 150, px: 16 }}>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/detail" element={<Detail />} />
        <Route path="/detail/:category" element={<Detail />} />
      </Routes>
    </main>
  </>
  );
};

export default Layout;
