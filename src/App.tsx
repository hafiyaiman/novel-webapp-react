import { Navigate, Route, Routes } from "react-router-dom";

import IndexPage from "@/pages/index";
import SigninPage from "@/pages/signin";
import SignUpPage from "./pages/signup";
import VerifyOtpPage from "./pages/verify-otp";
import HomePage from "./pages/home";
import FavoritesPage from "./pages/favorites";
import { AuthProvider } from "./context/AuthContext";
import PrivateRoute from "./components/PrivateRoute";


function App() {
  return (
    <AuthProvider>
      <Routes>
        {/* <Route element={<IndexPage />} path="/" />
        <Route element={<SigninPage />} path="/signin" />
        <Route element={<SignUpPage />} path="/signup" />
        <Route element={<VerifyOtpPage />} path="/verify-otp" />
        <Route element={<HomePage />} path="/home" />
        <Route element={<FavoritesPage />} path="/favorites" /> */}

        {/* Public Routes */}
        <Route path="/signin" element={<SigninPage />} />
        <Route path="/signup" element={<SignUpPage />} />
        <Route path="/verify-otp" element={<VerifyOtpPage />} />
        <Route path="/" element={<IndexPage />} />



        {/* Private Routes */}
        <Route element={<PrivateRoute />}>
          <Route path="/home" element={<HomePage />} />
          <Route path="/favorites" element={<FavoritesPage />} />

        </Route>

        {/* Redirect Unknown Routes */}
        <Route path="*" element={<Navigate to="/signin" />} />
      </Routes>
    </AuthProvider>
  );
}

export default App;
