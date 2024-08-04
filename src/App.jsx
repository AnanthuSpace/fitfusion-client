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
          <Route path="/trainer-login" element={<TrainerLogin />} />
          <Route path="/trainer-signup" element={<TrainerSignup />} />

        </Routes>
      </Router>
    </>
  );
}

export default App;
