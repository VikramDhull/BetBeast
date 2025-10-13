import { useContext } from "react";
import { ToastContainer } from "react-toastify";
import { Route, Routes, useLocation, Navigate } from "react-router-dom";
import Pricing from "./pages/Pricing";
import Strategy from "./pages/Strategy";
import Home from "./pages/Home";
import Footer from "./components/Footer";
import Terms from "./pages/Terms";
import Contact from "./pages/Contact";
import { AppContext } from "./Context/AppContext.jsx";
import Login from "./components/Login";
import Profile from "./pages/Profile.jsx";
import SafeSquares from "./pages/SafeSquares.jsx";
import TheNet from "./pages/TheNet.jsx";
import TheMatrix from "./pages/TheMatrix.jsx";
import SafeSquaresQ from "./pages/SafeSquaresQ.jsx";
import TheNetQ from "./pages/TheNetQ.jsx";
import TheMatrixQ from "./pages/TheMatrixQ.jsx";
import Loading from "./components/Loading.jsx";

function App() {
  const {
    showLogin,
    showSafeSquareQ,
    user,
    showTheNetQ,
    showTheMatrixQ,
    showLoading,
  } = useContext(AppContext);
  const location = useLocation();

  // Pages where footer should be hidden
  const hideFooterRoutes = [
    "/profile",
    "/safesquares",
    "/thenet",
    "/thematrix",
  ];

  return (
    <div>
      <ToastContainer position="bottom-right" />
      {showLoading && <Loading />}
      {showLogin && <Login />}
      {showSafeSquareQ && <SafeSquaresQ />}
      {showTheNetQ && <TheNetQ />}
      {showTheMatrixQ && <TheMatrixQ />}

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/pricing" element={<Pricing />} />
        <Route
          path="/strategy"
          element={user ? <Strategy /> : <Navigate to="/" />}
        />
        <Route path="/terms" element={<Terms />} />
        <Route path="/contact" element={<Contact />} />
        <Route
          path="/profile"
          element={user ? <Profile /> : <Navigate to="/" />}
        />
        <Route
          path="/safesquares"
          element={user ? <SafeSquares /> : <Navigate to="/" />}
        />
        <Route
          path="/thenet"
          element={user ? <TheNet /> : <Navigate to="/" />}
        />
        <Route
          path="/thematrix"
          element={user ? <TheMatrix /> : <Navigate to="/" />}
        />
      </Routes>

      {/* Show footer only if current path is NOT in hideFooterRoutes */}
      {!hideFooterRoutes.includes(location.pathname) && <Footer />}
    </div>
  );
}

export default App;
