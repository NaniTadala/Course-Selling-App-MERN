import { Button, Card, TextField } from "@mui/material";
import "../styles.css";
import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useSetRecoilState } from "recoil";
import { adminState } from "../store/atoms/admin";

export default function RegisterPage() {
    const navigate = useNavigate();
    const [admin, setAdmin] = useState({ email: "", password: "" });
    const setAdminRecoil = useSetRecoilState(adminState);
    const [message, setMessage] = useState();

    async function handleRegister() {
        if (admin.email.trim() === "" || admin.password.trim() == "") {
            setMessage("Email/Password fields cannot be empty");
            return;
        } else {
            try {
                const response = await axios.post(
                    "http://localhost:3000/admin/signup",
                    {
                        email: admin.email,
                        password: admin.password,
                    }
                );
                setAdminRecoil({
                    email: admin.email,
                    username: admin.email.split("@")[0].toUpperCase(),
                    isLoggedIn: true,
                });
                localStorage.setItem("token", response.data.token);
                localStorage.setItem("isLoggedIn", true);
                localStorage.setItem("email", admin.email);

                setMessage("");
                alert(response.data.message);
                navigate("/courses");
            } catch (error) {
                console.log(error);
            }
        }
    }

    return (
        <>
            <div className="page">
                <h1 className="page-title">Register An Admin Account</h1>

                <Card
                    variant="outlined"
                    sx={{ p: 3, border: "2px solid #1876D2" }}
                >
                    <div className="input-fields">
                        <TextField
                            label="Email"
                            variant="outlined"
                            value={admin.email}
                            type="text"
                            onChange={(e) =>
                                setAdmin((prev) => ({
                                    ...prev,
                                    email: e.target.value,
                                }))
                            }
                        />
                        <TextField
                            label="Password"
                            variant="outlined"
                            value={admin.password}
                            type="password"
                            onChange={(e) =>
                                setAdmin((prev) => ({
                                    ...prev,
                                    password: e.target.value,
                                }))
                            }
                        />
                    </div>
                    <Button
                        onClick={handleRegister}
                        className="button"
                        variant="contained"
                    >
                        Register
                    </Button>
                    {message && (
                        <div>
                            <p
                                style={{
                                    textAlign: "center",
                                    color: "#bc1c44",
                                    fontWeight: "500",
                                    fontSize: "18px",
                                    marginBottom: "5px",
                                }}
                            >
                                {message}
                            </p>
                        </div>
                    )}

                    <div className="page-login">
                        <h1 className="page-secondary-text">
                            Already a user? Click here to login.
                        </h1>
                        <Button
                            onClick={() => navigate("/login")}
                            className="button"
                            variant="contained"
                        >
                            Login
                        </Button>
                    </div>
                </Card>
            </div>
        </>
    );
}
