import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import LoginPage from "./pages/users/LoginPage";
import SignupPage from "./pages/users/SignupPage";
import SignUpVerification from "./components/users/SingUpVerification";
import LoginVerification from "./components/users/LoginVerification";
import UserProtecter from "./components/protucters/UserProtector";
import "./assets/styles/App.css";
import HomePage from "./pages/users/HomePage";
import ProfilePage from "./pages/users/ProfilePage";
import { ToastContainer } from "react-toastify"; 
import "react-toastify/dist/ReactToastify.css";
import TrainerLogin from "./components/trainers/TrainerLogin";
import TrainerSignup from "./components/trainers/TrainerSignup";
import AdminLogingPage from "./pages/admin/AdminLogingPage";
import AdminDashBoardPage from "./pages/admin/AdminDashBoardPage";
import TrainerOtpVerification from "./components/trainers/TrainerOtpVerification";
import TrainerConsole from "./components/trainers/TrainerConsole";

function App() {
  return (
    <>
      <Router>
        <ToastContainer />
        <Routes>
          {/* User Routes */}
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignupPage />} />
          <Route path="/verify-otp" element={<SignUpVerification />} />
          <Route path="/login-verify" element={<LoginVerification />} />
          <Route path="/profile" element={<UserProtecter><ProfilePage /></UserProtecter>} />

          {/* Trainer Routes */}
          <Route path="/trainer" element={<TrainerLogin />} />
          <Route path="/trainer-signup" element={<TrainerSignup />} />
          <Route path="/trainer-otp" element={<TrainerOtpVerification />} />
          <Route path="/trainer-console" element={<TrainerConsole />} />

          {/* Admin Routes */}
          <Route path="/admin" element={<AdminLogingPage />} />
          <Route path="/admin-console" element={<AdminDashBoardPage />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
