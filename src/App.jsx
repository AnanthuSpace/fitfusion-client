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
import AdminConsole from "./pages/admin/AdminConsole";
import AdminTrainerPage from "./pages/admin/AdminTrainerPage";
import AdminUserPage from "./pages/admin/AdminUserPage";
import AdminProtector from "./components/protucters/AdminProtector";
import TrainerSignup from "./components/trainers/TrainerSignup";
import TrainerProtector from "./components/protucters/TrainerProtector";
import TrainerLoginProtector from "./components/protucters/TrainerLoginProtector";
import UserLoginProtector from "./components/protucters/UserLoginProtector";
import AdminLoginProtector from "./components/protucters/AdminLoginProtector";
import TrainerDashboardPage from "./pages/trainers/TrainerDashboardPage";
import TrainerProfilePage from "./pages/trainers/TrainerProfilePage";
import TrainerChatPage from "./pages/trainers/TrainerChatPage";
import TrainerListPage from "./pages/users/TrainerListPage";
import UserDetailsForm from "./components/users/MoreDetails";
import TrainerViewPage from "./pages/users/TrainerViewPage";

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
          <Route path="/trainer-list" element={<TrainerListPage />} />
          <Route
            path="/profile"
            element={
              <UserProtecter>
                <ProfilePage />
              </UserProtecter>
            }
          />
          <Route
            path="/user-data"
            element={
              <UserProtecter>
                <UserDetailsForm />
              </UserProtecter>
            }
          />
          <Route
            path="/trainer-view/:trainerId"
            element={
              <UserProtecter>
                <TrainerViewPage />
              </UserProtecter>
            }
          />

          {/* Trainer Routes */}
          <Route
            path="/trainer"
            element={
              <TrainerLoginProtector>
                <TrainerLogin />
              </TrainerLoginProtector>
            }
          />
          <Route
            path="/trainer-signup"
            element={
              <TrainerLoginProtector>
                <TrainerSignup />
              </TrainerLoginProtector>
            }
          />
          <Route
            path="/trainer-otp"
            element={
              <TrainerLoginProtector>
                <TrainerOtpVerification />
              </TrainerLoginProtector>
            }
          />
          <Route
            path="/trainer-console"
            element={
              <TrainerProtector>
                <TrainerDashboardPage />
              </TrainerProtector>
            }
          />
          <Route
            path="/trainer-profile"
            element={
              <TrainerProtector>
                <TrainerProfilePage />
              </TrainerProtector>
            }
          />
          <Route
            path="/trainer-chat"
            element={
              <TrainerProtector>
                <TrainerChatPage />
              </TrainerProtector>
            }
          />

          {/* Admin Routes */}
          <Route path="/admin" element={<AdminLoginPage />} />
          <Route
            path="/admin-console"
            element={
              <AdminLoginProtector>
                <AdminConsole />
              </AdminLoginProtector>
            }
          />
          <Route
            path="/admin-trainer"
            element={
              <AdminProtector>
                <AdminTrainerPage />
              </AdminProtector>
            }
          />
          <Route
            path="/admin-user"
            element={
              <AdminProtector>
                <AdminUserPage />
              </AdminProtector>
            }
          />
        </Routes>
      </Router>
    </>
  );
}

export default App;
