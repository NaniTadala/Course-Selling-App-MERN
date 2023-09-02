import { atom } from "recoil";

export const purCoursesState = atom({
    key: "coursesState",
    default: [],
});

export const openState = atom({
    key: "openState",
    default: false,
});

export const userState = atom({
    key: "userState",
    default: {
        email: localStorage.getItem('email'),
        username: localStorage.getItem('email')?.split('@')[0].toUpperCase(),
        isLoggedIn: localStorage.getItem("isLoggedIn") !== null,
    },
});