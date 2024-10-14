import { useRoutes, Navigate } from "react-router-dom";
import Home from "../views/HomePage/Home";
import ChiTietSanPham from "../views/ChiTietSanPham/ChiTietSanPham";
import MuaSanPham from "../views/MuaSanPham/MuaSanPham";
import SanPhamTatCa from "../views/SanPhamTatCa/SanPhamTatCa";
import SanPhamDesktop from "../views/SanPhamDesktop/SanPhamDesktop";

import SanPhamApple from "../views/SanPhamApple/SanPhamApple";
import SanPhamASUS from "../views/SanPhamASUS/SanPhamASUS";
import Test from "../views/Test/Test";
import ProfileCustomer from "../profileCustomer/profileCustomer";
import LoginView from "../views/page/login-view";

const RouterView = () => {
  const element = useRoutes([
    {
      path: "/",
      element: <Home />,
    },
    {
      path: "/SanPham/:id",
      element: <ChiTietSanPham />,
    },
    {
      path: "/MuaHang/:id",
      element: <MuaSanPham />,
    },
    {
      path: "/All",
      element: <SanPhamTatCa />,
    },
    {
      path: "/Desktop",
      element: <SanPhamDesktop />,
    },
    {
      path: "/login",
      element: <LoginView />,
    },
    {
      path: "/Apple",
      element: <SanPhamApple />,
    },
    {
      path: "/ASUS",
      element: <SanPhamASUS />,
    },
    {
      path: "/test",
      element: <Test />,
    },
    {
      path: "/profile",
      element: <ProfileCustomer />,
    },
    {
      path: "*",
      element: <Navigate to="/contact" replace />,
    },
  ]);

  return <div>{element}</div>;
};

export default RouterView;
