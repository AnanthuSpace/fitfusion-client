import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import LoginPage from "./pages/users/LoginPage";
import Signup from "./components/users/Signup";
import LoginVerification from "./components/users/LoginVerification";
import "./assets/App.css";

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<LoginPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/verify-otp" element={<LoginVerification />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;