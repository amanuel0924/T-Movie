import Dashboard from './pages/admin/Dashboard'
import Home from './pages/Home'
import Detail from './pages/Detail'
import Login from './pages/admin/Login'
import PrivateRouter from './componets/PrivateRoute'
import {BrowserRouter, Route, Routes} from 'react-router-dom'
function App() {
  return (
      <div>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/detail" element={<Detail />} />
            <Route path="" element={<PrivateRouter />}>
            <Route path="/admin/*" element={<Dashboard />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </div>
  );
}
export default App;