import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import MainPage from "./pages/MainPage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";

function App() {
  console.log(process.env.REACT_APP_BE_LINK);
  return (
    <Router>
      <Routes>
        <Route path="/login" exact element={<LoginPage />} />
        <Route path="/" exact element={<MainPage />} />
        <Route path="/register" exact element={<RegisterPage />} />
      </Routes>
    </Router>
  );
}

export default App;
