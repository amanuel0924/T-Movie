import Dashboard from './pages/admin/Dashboard'
import Login from './pages/admin/Login'
import PrivateRouter from './componets/PrivateRoute'
import {BrowserRouter, Route, Routes} from 'react-router-dom'
import { ToastContainer } from 'react-toastify';
import Layout from './componets/Layout';
import 'react-toastify/dist/ReactToastify.css';
function App() {
  return (
    <div>
      <BrowserRouter>
      <Routes>
          <Route path="/*" element={<Layout />} />
          <Route path="/login" element={<Login />} />
          <Route element={<PrivateRouter />}>
            <Route path="/admin/*" element={<Dashboard />} />
          </Route>
        </Routes>
      </BrowserRouter>
      <ToastContainer />
    </div>
  );
}
export default App;