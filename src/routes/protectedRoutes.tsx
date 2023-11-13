import { Navigate, Outlet } from "react-router-dom";
import { UseAuth } from "../contexts/Authentication";

function ProtectedRoutes() {
    const { token } = UseAuth() || {};

    if (!token) {
        return <Navigate to="/login" />
    }
    else {
        <Outlet/>
    }
}

export default ProtectedRoutes