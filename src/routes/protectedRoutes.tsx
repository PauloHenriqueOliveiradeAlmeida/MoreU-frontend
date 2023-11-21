import { useContext } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { AuthContext } from "../contexts/Authentication";

function ProtectedRoutes() {
    const auth = useContext(AuthContext);

    if (!auth?.token) {
        return <Navigate to="/" />
    }
    else {
        return <Outlet/>
    }
}

export default ProtectedRoutes