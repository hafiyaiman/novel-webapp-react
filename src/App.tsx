import { Route, Routes } from "react-router-dom";

import IndexPage from "@/pages/index";
import DocsPage from "@/pages/docs";
import PricingPage from "@/pages/pricing";
import BlogPage from "@/pages/blog";
import AboutPage from "@/pages/about";
import SigninPage from "@/pages/signin";
import SignUpPage from "./pages/signup";
import VerifyOtpPage from "./pages/verify-otp";


function App() {
  return (
    <Routes>
      <Route element={<IndexPage />} path="/" />
      <Route element={<DocsPage />} path="/docs" />
      <Route element={<PricingPage />} path="/pricing" />
      <Route element={<BlogPage />} path="/blog" />
      <Route element={<AboutPage />} path="/about" />
      <Route element={<SigninPage />} path="/signin" />
      <Route element={<SignUpPage />} path="/signup" />
      <Route element={<VerifyOtpPage />} path="/verify-otp" />
    </Routes>
  );
}

export default App;
