import './App.scss';

import Home from './HomePage/Home';
import ChiTietSanPham from './ChiTietSanPham/ChiTietSanPham';
import MuaSanPham from './MuaSanPham/MuaSanPham';
import SanPhamTatCa from './SanPhamTatCa/SanPhamTatCa';
import SanPhamDesktop from './SanPhamDesktop/SanPhamDesktop';
import SanPhamApple from './SanPhamApple/SanPhamApple';
import SanPhamASUS from './SanPhamASUS/SanPhamASUS';

import Test from './Test/Test'

//Thư viện
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {
  BrowserRouter,
  Switch,
  Route,
  Link
} from "react-router-dom";

/**
 * 2 components: class components / function components (function , arrow)
 */



function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <header>

          <Switch>
            <Route path="/" exact>
              <Home />
            </Route>
            <Route path="/SanPham/:id">
              <ChiTietSanPham />
            </Route>
            <Route path="/MuaHang/:id">
              <MuaSanPham />
            </Route>
            <Route path="/All">
              <SanPhamTatCa />
            </Route>
            <Route path="/Desktop">
              <SanPhamDesktop />
            </Route>
            <Route path="/Apple">
              <SanPhamApple />
            </Route>
            <Route path="/ASUS">
              <SanPhamASUS />
            </Route>

            <Route path="/test">
              <Test />
            </Route>

          </Switch>

        </header>

        <ToastContainer
          position="top-right"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="colored"
        />
      </div>
    </BrowserRouter>
  );
}

export default App;
