import { PropsWithChildren, createContext, useContext, useEffect, useMemo, useState } from "react";
import { useCookies } from "react-cookie"
import api from "../services/api";
import Auth from "../types/authentication";


const AuthContext = createContext<Auth | null>(null);

function AuthProvider({children}: PropsWithChildren) {
    const [cookies, setCookie, removeCookie] = useCookies();
    const [token, setToken] = useState<string>(cookies["api_token"]);


    useEffect(() => {
        if (token) {
            api.defaults.headers.common.Authorization = `Bearer ${token}`
            setCookie("api_token", token);
        }

        console.log(token)
    }, [removeCookie, setCookie, token]);

    const values = useMemo(
        () => ({
            token,
            setToken
        }),
        [setToken, token]
    )

    return (
        <AuthContext.Provider value={values}>
            {children}
        </AuthContext.Provider>
    );

}

function UseAuth() {
    return useContext(AuthContext);
}

export default AuthProvider;
export { UseAuth };