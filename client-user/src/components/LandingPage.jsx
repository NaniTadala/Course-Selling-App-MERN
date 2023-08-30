"@mui/material/Typography";
import Button from "@mui/material/Button";
import "../styles.css";
import { useNavigate } from "react-router-dom";
import { Main, openState } from "./AppBar";
import { useRecoilValue } from "recoil";
import { userState } from "../store/atoms/user";

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
                    src="https://opensource.com/sites/default/files/lead-images/browser_web_internet_website.png"
                    alt=""
                />
            </div>
        </Main>
    );
}
