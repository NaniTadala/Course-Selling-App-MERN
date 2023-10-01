import { styled, useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import CssBaseline from "@mui/material/CssBaseline";
import MuiAppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import ShoppingBasketIcon from "@mui/icons-material/ShoppingBasket";
import LibraryBooksIcon from "@mui/icons-material/LibraryBooks";
import AccountBoxIcon from "@mui/icons-material/AccountBox";
import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useRecoilState } from "recoil";
import { adminState } from "../store/atoms/admin";
import { useEffect } from "react";
import jwt_decode from "jwt-decode";
import { openState } from "../store/atoms/admin";

const drawerWidth = 240;

const Main = styled("main", { shouldForwardProp: (prop) => prop !== "open" })(
    ({ theme, open }) => ({
        flexGrow: 1,
        padding: theme.spacing(3),
        transition: theme.transitions.create("margin", {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
        marginLeft: `-${drawerWidth}px`,
        ...(open && {
            transition: theme.transitions.create("margin", {
                easing: theme.transitions.easing.easeOut,
                duration: theme.transitions.duration.enteringScreen,
            }),
            marginLeft: 0,
        }),
    })
);

const AppBar = styled(MuiAppBar, {
    shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
    transition: theme.transitions.create(["margin", "width"], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
    }),
    ...(open && {
        width: `calc(100% - ${drawerWidth}px)`,
        marginLeft: `${drawerWidth}px`,
        transition: theme.transitions.create(["margin", "width"], {
            easing: theme.transitions.easing.easeOut,
            duration: theme.transitions.duration.enteringScreen,
        }),
    }),
}));

const DrawerHeader = styled("div")(({ theme }) => ({
    display: "flex",
    alignItems: "center",
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
    justifyContent: "flex-end",
}));

export default function ButtonAppBar() {
    const theme = useTheme();
    const [admin, setAdmin] = useRecoilState(adminState);
    const [open, setOpen] = useRecoilState(openState);
    const navigate = useNavigate();

    const handleDrawerOpen = () => {
        setOpen(true);
    };

    const handleDrawerOnNoLogin = () => {
        alert("Please Login");
        navigate("/login");
    };

    const handleDrawerClose = () => {
        setOpen(false);
    };

    useEffect(() => {
        init();
    }, []);

    async function init() {
        const token = localStorage.getItem("token");

        if (!token) {
            // Handle the case where there's no token
            return;
        }

        try {
            const decodedToken = jwt_decode(token);
            const currentTimestamp = Date.now() / 1000; // Get current timestamp in seconds

            if (decodedToken.exp && currentTimestamp > decodedToken.exp) {
                // Token has expired
                handleTokenExpired();
            }
        } catch (error) {
            console.log(error);
        }
    }

    function handleTokenExpired() {
        // Handle the case where the token has expired
        localStorage.removeItem("token");
        localStorage.removeItem("isLoggedIn");
        localStorage.removeItem("email");
        setAdmin({
            email: "",
            password: "",
            isLoggedIn: false,
        });
        console.log("Token has expired.");
    }

    const handleLogout = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("isLoggedIn");
        localStorage.removeItem("email");
        setAdmin({
            email: "",
            password: "",
            isLoggedIn: false,
        });
        navigate("/");
    };

    return (
        <Box sx={{ display: "flex" }}>
            <CssBaseline />
            <AppBar position="fixed" open={open}>
                <Toolbar>
                    <IconButton
                        color="inherit"
                        aria-label="open drawer"
                        onClick={
                            admin.isLoggedIn
                                ? handleDrawerOpen
                                : handleDrawerOnNoLogin
                        }
                        edge="start"
                        sx={{ mr: 2, ...(open && { display: "none" }) }}
                    >
                        <MenuIcon />
                    </IconButton>
                    <div
                        style={{
                            display: "flex",
                            justifyContent: "space-between",
                            width: "100%",
                        }}
                    >
                        <Typography
                            sx={{ cursor: "pointer" }}
                            onClick={() => navigate("/")}
                            variant="h6"
                            noWrap
                            component="div"
                        >
                            LearnUp
                        </Typography>
                        {admin.isLoggedIn ? (
                            <div>
                                <Button onClick={handleLogout} color="inherit">
                                    Logout
                                </Button>
                            </div>
                        ) : (
                            <div>
                                <Button
                                    onClick={() => navigate("/register")}
                                    color="inherit"
                                >
                                    Register
                                </Button>
                                <Button
                                    onClick={() => navigate("/login")}
                                    color="inherit"
                                >
                                    Login
                                </Button>
                            </div>
                        )}
                    </div>
                </Toolbar>
            </AppBar>
            <Drawer
                sx={{
                    width: drawerWidth,
                    flexShrink: 0,
                    "& .MuiDrawer-paper": {
                        width: drawerWidth,
                        boxSizing: "border-box",
                    },
                }}
                variant="persistent"
                anchor="left"
                open={open}
            >
                <DrawerHeader>
                    {admin.isLoggedIn && (
                        <List>
                            <ListItem key="name" disablePadding>
                                <ListItemButton>
                                    <ListItemIcon sx={{ minWidth: 35 }}>
                                        <AccountBoxIcon />
                                    </ListItemIcon>
                                    <ListItemText
                                        primary={admin?.username}
                                        secondary={admin?.email}
                                    />
                                </ListItemButton>
                            </ListItem>
                        </List>
                    )}
                    <IconButton onClick={handleDrawerClose}>
                        {theme.direction === "ltr" ? (
                            <ChevronLeftIcon />
                        ) : (
                            <ChevronRightIcon />
                        )}
                    </IconButton>
                </DrawerHeader>
                <Divider />
                <List>
                    <ListItem disablePadding>
                        <ListItemButton
                            onClick={() => {
                                handleDrawerClose();
                                navigate("/courses");
                            }}
                        >
                            <ListItemIcon>
                                <LibraryBooksIcon />
                            </ListItemIcon>
                            <ListItemText primary={"All Courses"} />
                        </ListItemButton>
                    </ListItem>
                </List>
                <List>
                    <ListItem disablePadding>
                        <ListItemButton
                            onClick={() => {
                                handleDrawerClose();
                                navigate("/createCourse");
                            }}
                        >
                            <ListItemIcon>
                                <ShoppingBasketIcon />
                            </ListItemIcon>
                            <ListItemText primary={"Create Courses"} />
                        </ListItemButton>
                    </ListItem>
                </List>
            </Drawer>
        </Box>
    );
}

export { Main };
