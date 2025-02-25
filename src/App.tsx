import { Route, Routes } from "react-router-dom";

import IndexPage from "@/pages/index";
import SigninPage from "@/pages/signin";
import SignUpPage from "./pages/signup";
import VerifyOtpPage from "./pages/verify-otp";
import HomePage from "./pages/home";


function App() {
  return (
    <Routes>
      <Route element={<IndexPage />} path="/" />
      {/* <Route element={<DocsPage />} path="/docs" />
      <Route element={<PricingPage />} path="/pricing" />
      <Route element={<BlogPage />} path="/blog" />
      <Route element={<AboutPage />} path="/about" /> */}
      <Route element={<SigninPage />} path="/signin" />
      <Route element={<SignUpPage />} path="/signup" />
      <Route element={<VerifyOtpPage />} path="/verify-otp" />
      <Route element={<HomePage />} path="/home" />
    </Routes>
  );
}

export default App;
