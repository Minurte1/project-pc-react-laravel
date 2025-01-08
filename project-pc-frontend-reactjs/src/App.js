import "./App.scss";
import "bootstrap/dist/css/bootstrap.min.css";

// Thư viện
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { library } from "@fortawesome/fontawesome-svg-core";
import { faUser, faSignOutAlt } from "@fortawesome/free-solid-svg-icons";

import RouterView from "./web-view/router-view";
import AdminRouter from "./admin-view/router-admin";
import GuardRoute from "./authentication/guardRoute";
import Nav2 from "./share-view/Nav2";
import Footer from "./share-view/Footer";
import { AuthProvider } from "./authentication/AuthContext"; // Đường dẫn tới AuthContext
import { Grid } from "@mui/material";
import NavBarUser from "./user-view/components/navBarUser";
import UserRouter from "./user-view/router-user";
import { SnackbarProvider } from "notistack";
function App() {
  // Thêm các icon vào thư viện
  library.add(faUser, faSignOutAlt);
  return (
    <AuthProvider>
      <Router>
        <SnackbarProvider
          maxSnack={3}
          anchorOrigin={{
            vertical: "bottom",
            horizontal: "left",
          }}
          autoHideDuration={2000}
        >
          <div className="App">
            <header>
              <Routes>
                <Route path="/*" element={<MainLayout />} />
                <Route path="/admin/*" element={<AdminLayout />} />{" "}
                <Route path="/profile/*" element={<RouterUser />} />
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
          </div>{" "}
        </SnackbarProvider>
      </Router>
    </AuthProvider>
  );
}
const RouterUser = () => (
  <>
    {" "}
    <Nav2 />
    <Grid container style={{ height: "100vh" }}>
      <Grid item xs={3} md={2.5}>
        <NavBarUser />
      </Grid>
      <Grid item xs={9} md={9}>
        <Routes>
          <Route path="/*" element={<UserRouter />} />
        </Routes>
      </Grid>
    </Grid>
  </>
);

const MainLayout = () => (
  <>
    <Nav2 />
    <Routes>
      <Route path="/*" element={<RouterView />} />
    </Routes>
    <Footer />
  </>
);

const AdminLayout = () => (
  <Routes>
    <Route path="/*" element={<AdminRouter />} />
  </Routes>
);
export default App;
