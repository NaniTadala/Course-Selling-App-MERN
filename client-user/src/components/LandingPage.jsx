"@mui/material/Typography";
import Button from "@mui/material/Button";
import "../styles.css";
import { useNavigate } from "react-router-dom";
import { Main } from "./AppBar";
import { useRecoilValue } from "recoil";
import { openState, userState } from "../store/atoms/user";

export default function LandingPage() {
    const navigate = useNavigate();
    const admin = useRecoilValue(userState);
    const open = useRecoilValue(openState);
    return (
        <Main open={open}>
            <div className="landing-container">
                <div className="header">
                    <h1 className="dashboard-title">User Dashboard</h1>
                    <Button
                        onClick={
                            admin.isLoggedIn
                                ? () => navigate("/courses")
                                : () => navigate("/login")
                        }
                        variant="contained"
                    >
                        {admin.isLoggedIn ? "View Courses" : "Login Here"}
                    </Button>
                </div>
                <img
                    className="dashboard-image"
                    src="https://img.freepik.com/free-vector/programming-languages-learning-software-coding-courses-website-development-class-script-writing-it-programmers-cartoon-characters_335657-3454.jpg?w=826&t=st=1696132298~exp=1696132898~hmac=c704da4d7694e407152737781cf21f2bbaa51ac7c4f4a408ec91b668df80e9c3"
                    alt="dashboard-image"
                />
            </div>
        </Main>
    );
}
