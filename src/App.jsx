import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import LoginPage from "./pages/users/LoginPage";
import SignupPage from "./pages/users/SignupPage";
import SignUpVerification from "./components/users/SingUpVerification"
import LoginVerification from "./components/users/LoginVerification";
import UserProtecter from "./components/protucters/UserProtector";
import HomePage from "./pages/users/HomePage";
import ProfilePage from "./pages/users/ProfilePage";
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
import AdminLoginProtector from "./components/protucters/AdminLoginProtector";
import TrainerProfilePage from "./pages/trainers/TrainerProfilePage";
import TrainerChatPage from "./pages/trainers/TrainerChatPage";
import TrainerListPage from "./pages/users/TrainerListPage";
import UserDetailsForm from "./components/users/MoreDetails";
import TrainerViewPage from "./pages/users/TrainerViewPage";
import PaymentSuccess from "./components/users/PaymentSuccess";
import PaymentFailed from "./components/users/PaymentFailed";
import ChatPage from "./pages/users/ChatPage";
import TrainerCustomersPage from "./pages/trainers/TrainerCustomersPage";
import TrainerDietPage from "./pages/trainers/TrainerDietPage";
import TutorialVideoPage from "./pages/trainers/TutorialVideoPage";
import TutorialsPage from "./pages/users/TutorialsPage";
import TransactionHistoryPage from "./pages/users/TransactionHistoryPage";
import TrainerHistoryPage from "./pages/trainers/TrainerHistoryPage";
import TrainerIsVerified from "./components/protucters/TrainerIsVerified";
import ErrorBoundary from "./components/common/ErrorBoundary";
import Error404 from "./components/common/Error404";
import { Toaster } from "sonner";
import "./assets/styles/App.css";
import TrainerDashboardPage from "./pages/trainers/TrainerDashboardPage";
import TrainerReviewPage from "./pages/trainers/TrainerReviewPage";
import UserLoginProtector from "./components/protucters/UserLoginProtector";


function App() {
  return (
    <>
      <Router>
      <Toaster richColors />
      <ErrorBoundary>
        <Routes>

          {/* User Routes */}
          <Route path="/" element={<HomePage />} />
          <Route path="/trainer-list" element={<TrainerListPage />} />
          <Route path="/payment-success" element={<PaymentSuccess />}/>
          <Route path="/payment-failed" element={<PaymentFailed />} />
          <Route path="/login" element={<UserLoginProtector><LoginPage /></UserLoginProtector>} />
          <Route path="/signup" element={<UserLoginProtector><SignupPage /></UserLoginProtector>} />
          <Route path="/verify-otp" element={<UserLoginProtector><SignUpVerification /></UserLoginProtector>} />
          <Route path="/login-verify" element={<UserLoginProtector><LoginVerification /></UserLoginProtector>} />
          <Route path="/profile" element={<UserProtecter><ProfilePage /></UserProtecter>} />
          <Route path="/user-data" element={<UserProtecter><UserDetailsForm /></UserProtecter>} />
          <Route path="/trainer-view" element={<UserProtecter><TrainerViewPage /></UserProtecter>} />
          <Route path="/user-chat" element={<UserProtecter><ChatPage /></UserProtecter>} />
          <Route path="/tutorials" element={<UserProtecter><TutorialsPage /></UserProtecter>} />
          <Route path="/history" element={<UserProtecter><TransactionHistoryPage /></UserProtecter>} />

          {/* Trainer Routes */}
          <Route path="/trainer" element={<TrainerLoginProtector><TrainerLogin /></TrainerLoginProtector>} />
          <Route path="/trainer-signup" element={<TrainerLoginProtector><TrainerSignup /></TrainerLoginProtector>} />
          <Route path="/trainer-otp" element={<TrainerLoginProtector><TrainerOtpVerification /></TrainerLoginProtector>} />
          <Route path="/trainer-profile" element={<TrainerProtector><TrainerProfilePage /></TrainerProtector>} />
          <Route path="/trainer-console" element={<TrainerProtector><TrainerDashboardPage /></TrainerProtector>} />
          <Route path="/customers" element={<TrainerProtector><TrainerIsVerified><TrainerCustomersPage /></TrainerIsVerified></TrainerProtector>} />
          <Route path="/trainer-chat" element={<TrainerProtector><TrainerIsVerified><TrainerChatPage /></TrainerIsVerified></TrainerProtector>} />
          <Route path="/diet" element={<TrainerProtector><TrainerIsVerified><TrainerDietPage /></TrainerIsVerified></TrainerProtector>} />
          <Route path="/videos" element={<TrainerProtector><TrainerIsVerified><TutorialVideoPage/></TrainerIsVerified></TrainerProtector>} />
          <Route path="/transaction-history" element={<TrainerProtector><TrainerIsVerified><TrainerHistoryPage/></TrainerIsVerified></TrainerProtector>} />
          <Route path="//trainer-review" element={<TrainerProtector><TrainerIsVerified><TrainerReviewPage/></TrainerIsVerified></TrainerProtector>} />


          {/* Admin Routes */}
          <Route path="/admin" element={<AdminLoginPage />} />
          <Route path="/admin-console" element={<AdminLoginProtector><AdminConsole /></AdminLoginProtector>} />
          <Route path="/admin-trainer" element={<AdminProtector><AdminTrainerPage /></AdminProtector>} />
          <Route path="/admin-user" element={<AdminProtector><AdminUserPage /></AdminProtector>} />
          
          <Route path="*" element={<Error404 />} />
        </Routes>
        </ErrorBoundary>
      </Router>
    </>
  );
}

export default App;
