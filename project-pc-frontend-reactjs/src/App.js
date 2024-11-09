import "./App.scss";
import 'bootstrap/dist/css/bootstrap.min.css';

// Thư viện
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { library } from '@fortawesome/fontawesome-svg-core';
import { faUser, faSignOutAlt } from '@fortawesome/free-solid-svg-icons';

import RouterView from "./web-view/router-view";
import AdminRouter from "./admin-view/router-admin";
import GuardRoute from "./authentication/guardRoute";
import Nav2 from "./share-view/Nav2";
import Footer from "./share-view/Footer";
import { AuthProvider } from "./authentication/AuthContext"; // Đường dẫn tới AuthContext

function App() {
  // Thêm các icon vào thư viện
  library.add(faUser, faSignOutAlt);
  return (
    <AuthProvider>
      <Router>
        <div className="App">
          <header>
            <Routes>
              <Route path="/*" element={<MainLayout />} />
              <Route path="/admin/*" element={<GuardRoute element={AdminLayout} />} />
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
    </AuthProvider>
  );
}

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