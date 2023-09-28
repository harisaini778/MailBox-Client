import LogIn from './components/Login';
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import './App.css';
import EmailVerify from './components/EmailVerify';

function App() {
  return (
         <Router>
        <Routes>
          <Route path="/" element={<Navigate to="/LogIn" />} />
           <Route path="/LogIn" element={<LogIn />} />
          <Route path="/EmailVerify" element={<EmailVerify />} />
        </Routes>
      </Router>
  );
}

export default App;
