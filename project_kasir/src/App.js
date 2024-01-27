import {BrowserRouter as Router, Routes, Route} from "react-router-dom";
import './App.css';

import Homepage from './pages/homepage';
import Fpage from './pages/fpage';
import AddMenu from "./pages/addMenu";
import KasirSetting from './pages/kasirSetting';
import EditMenu from './pages/kasirEdit';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Homepage />}/>
        <Route path="/mode-kasir" element={<Fpage />}/>
        <Route path='/mode-kasir/add' element={<AddMenu />}/>
        <Route path='/mode-kasir/setting' element={<KasirSetting />}/>
        <Route path='/mode-kasir/setting/edit/:id' element={<EditMenu />}/>
      </Routes>
    </Router>
  );
}

export default App;
