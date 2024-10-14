import "./App.scss";

import Home from "./HomePage/Home";
import ChiTietSanPham from "./ChiTietSanPham/ChiTietSanPham";
import MuaSanPham from "./MuaSanPham/MuaSanPham";
import SanPhamTatCa from "./SanPhamTatCa/SanPhamTatCa";
import SanPhamDesktop from "./SanPhamDesktop/SanPhamDesktop";
import SanPhamApple from "./SanPhamApple/SanPhamApple";
import SanPhamASUS from "./SanPhamASUS/SanPhamASUS";
import Test from "./Test/Test";

// Thư viện
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import AdminLogin from "../views/page/login-view";
import ProfileCustomer from "../profileCustomer/profileCustomer";

function App() {
  return (
    <Router>
      <div className="App">
        <header>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/SanPham/:id" element={<ChiTietSanPham />} />
            <Route path="/MuaHang/:id" element={<MuaSanPham />} />
            <Route path="/All" element={<SanPhamTatCa />} />
            <Route path="/Desktop" element={<SanPhamDesktop />} />
            <Route path="/login" element={<AdminLogin />} />
            <Route path="/Apple" element={<SanPhamApple />} />
            <Route path="/ASUS" element={<SanPhamASUS />} />
            <Route path="/test" element={<Test />} />{" "}
            <Route path="/profile" element={<ProfileCustomer />} />
          </Routes>
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
    </Router>
  );
}

export default App;
