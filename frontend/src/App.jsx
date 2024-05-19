import Dashboard from './pages/admin/Dashboard'
import Home from './pages/Home'
import Detail from './pages/Detail'
import {BrowserRouter, Route, Routes} from 'react-router-dom'
function App() {
  return (
      <div>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/detail" element={<Detail />} />
            <Route path="/admin/*" element={<Dashboard />} />
          </Routes>
        </BrowserRouter>
      </div>
  );
}
export default App;