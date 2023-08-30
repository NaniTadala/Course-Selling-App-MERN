import "./App.css";
import ButtonAppBar from "./components/AppBar";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LandingPage from "./components/LandingPage";
import RegisterPage from "./components/RegisterPage";
import LoginPage from "./components/LoginPage";
import ShowCourses from "./components/ShowCourses";
import CoursePage from "./components/CoursePage";
import PurchasedCourses from "./components/PurchasedCourses";

function App() {
    return (
        <Router>
            <ButtonAppBar />
            <Routes>
                <Route path="/" element={<LandingPage />} />
                <Route path="/register" element={<RegisterPage />} />
                <Route path="/login" element={<LoginPage />} />
                <Route path="/courses" element={<ShowCourses />} />
                <Route path="/courses/:courseId" element={<CoursePage />} />
                <Route
                    path="/purchasedcourses"
                    element={<PurchasedCourses />}
                />
            </Routes>
        </Router>
    );
}

export default App;
