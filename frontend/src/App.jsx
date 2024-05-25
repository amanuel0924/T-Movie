import Dashboard from './pages/admin/Dashboard'
import Home from './pages/Home'
import Detail from './pages/Detail'
import Login from './pages/admin/Login'
import PrivateRouter from './componets/PrivateRoute'
import {BrowserRouter, Route, Routes} from 'react-router-dom'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
function App() {
  return (
      <div>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/detail" element={<Detail />} />
            <Route path="/admin/*" element={<Dashboard />} />
            <Route path="" element={<PrivateRouter />}>
            
            </Route>
          </Routes>
        </BrowserRouter>
        <ToastContainer />
      </div>
  );
}
export default App;