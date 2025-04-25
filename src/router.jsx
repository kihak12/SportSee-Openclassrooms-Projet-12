import {createBrowserRouter, Navigate} from "react-router-dom";
import {UserDetails} from "./pages/userDetails.jsx";

export const router = createBrowserRouter([
    {
        path: "/user/:id",
        element: <UserDetails />
    },
    {
        path: "*",
        element: <Navigate to="/user/18" replace />
    },
])
