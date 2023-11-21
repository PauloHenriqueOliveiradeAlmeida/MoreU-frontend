import { PropsWithChildren, createContext, useEffect, useState } from "react";
import { useCookies } from "react-cookie"
import api from "../services/api";
import Auth from "../types/authentication";
import Clientes from "../types/clientes";


export const AuthContext = createContext<Auth | null>(null);

function AuthProvider({ children }: PropsWithChildren) {
    const [cookies, setCookie, removeCookie] = useCookies();
    const [token, setToken] = useState<string | undefined>(cookies.api_token);

    useEffect(() => {
        if (cookies.api_token) {
            setToken(cookies.api_token);
            api.defaults.headers.common.Authorization = `Bearer ${token}`;
        }
        else {
            removeCookie("api_token");
            setToken(undefined);
            delete api.defaults.headers.common.Authorization
        }
    }, [cookies.api_token, removeCookie, token]);

    async function Login(data: Clientes) {
        try {
            const request = await api.post("/clientes/login", data);

            if (request.status == 200) {
                setToken(request.data.token);
                setCookie("api_token", request.data.token);
                api.defaults.headers.common.Authorization = `Bearer ${token}`;
                return true;

            }
            return false;
        }
        catch {
            return false;
        }
    }

    function Logout() {
        removeCookie("api_token");
        setToken(undefined);
        delete api.defaults.headers.common.Authorization
    }

    return (
        <AuthContext.Provider value={{token, Login, Logout}}>
            {children}
        </AuthContext.Provider>
    );

}


export default AuthProvider;