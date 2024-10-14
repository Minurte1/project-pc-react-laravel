import "./App.scss";

// Thư viện
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import RouterView from "./web-view/router-view";
import AdminRouter from "./admin-view/router-admin";
import GuardRoute from "./authentication/guardRoute";
import Nav2 from "./share-view/Nav2";
import Footer from "./share-view/Footer";

function App() {
  return (
    <Router>
      <div className="App">
        <header>
          <Routes>
            <Route path="/*" element={<MainLayout />} />
            <Route
              path="/admin/*"
              element={<GuardRoute element={AdminLayout} />}
            />
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
const MainLayout = () => (
  <>
    <Nav2 />
    <Routes>
      {" "}
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
