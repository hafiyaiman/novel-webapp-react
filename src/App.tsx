import { Navigate, Route, Routes, useNavigate } from "react-router-dom";

import IndexPage from "@/pages/index";
import SigninPage from "@/pages/signin";
import SignUpPage from "./pages/signup";
import VerifyOtpPage from "./pages/verify-otp";
import HomePage from "./pages/home";
import FavoritesPage from "./pages/favorites";
import { AuthProvider } from "./context/AuthContext";
import PrivateRoute from "./components/PrivateRoute";
import { Button } from "@heroui/button";


function App() {
  const navigate = useNavigate();

  return (
    <AuthProvider>
      <Routes>
        {/* Public Routes */}
        <Route path="/signin" element={<SigninPage />} />
        <Route path="/signup" element={<SignUpPage />} />
        <Route path="/verify-otp" element={<VerifyOtpPage />} />
        <Route path="/" element={<IndexPage />} />
        <Route
          path="/404"
          element={
            <div className="flex h-screen items-center justify-center">
              <div className="text-center">
                <h1 className="text-6xl font-bold  text-2xl">
                  404 Not Found
                </h1>
                <div className="mt-4">
                  <Button
                    variant="bordered"
                    color="primary"
                    onPress={() => {
                      navigate("/home");
                    }}
                  >
                    Go Home
                  </Button>
                </div>
              </div>

            </div>
          }
        />

        {/* Private Routes */}
        <Route element={<PrivateRoute />}>
          <Route path="/home" element={<HomePage />} />
          <Route path="/favorites" element={<FavoritesPage />} />
        </Route>

        {/* Redirect Unknown Routes */}
        <Route path="*" element={<Navigate to="/404" />} />
      </Routes>
    </AuthProvider>
  );
}

export default App;

