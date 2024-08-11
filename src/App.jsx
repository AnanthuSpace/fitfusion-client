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
import AdminLoginPage from "./components/admin/AdminLogin";
import TrainerOtpVerification from "./components/trainers/TrainerOtpVerification";
import TrainerConsole from "./components/trainers/TrainerConsole";
import SignupCopy from "./components/trainers/SignupCopy";
import AdminConsole from "./pages/admin/AdminConsole";
import AdminTrainerPage from "./pages/admin/AdminTrainerPage";
import AdminUserPage from "./pages/admin/AdminUserPage";
import AdminProtector from "./components/protucters/AdminProtector";


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
          <Route path="/trainer-signup" element={<SignupCopy />} />
          <Route path="/trainer-otp" element={<TrainerOtpVerification />} />
          <Route path="/trainer-console" element={<TrainerConsole />} />

          {/* Admin Routes */}
          <Route path="/admin" element={<AdminLoginPage />} />
          <Route path="/admin-console" element={<AdminProtector><AdminConsole /></AdminProtector>} />
          <Route path="/admin-trainer" element={<AdminProtector><AdminTrainerPage /></AdminProtector>} />
          <Route path="/admin-user" element={<AdminProtector><AdminUserPage /></AdminProtector>} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
