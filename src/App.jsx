import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import LoginPage from "./pages/users/LoginPage";
import SignupPage from "./pages/users/SignupPage";
import LoginVerification from "./components/users/singUpVerification";
import "./assets/styles/App.css";

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<LoginPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignupPage />} />
          <Route path="/verify-otp" element={<LoginVerification />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;