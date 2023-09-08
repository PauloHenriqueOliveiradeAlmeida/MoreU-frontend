import { createBrowserRouter } from "react-router-dom";
import App from "./App";
import Login from "./Login";
import Cadastro from "./Cadastro";

const router = createBrowserRouter([
    {
        path: "/",
        element: <App/>
    },
    {
        path: "/login",
        element: <Login/>
    },
    {
        path: "/cadastro",
        element: <Cadastro/>
    },
    {
        path: "/dashboard",
        element: <></>,
        children: [
            {
                path: "registrar",
                element: <></>
            },
            {
                path: "gerar-relatorio",
                element: <></>
            }
        ]
    }
]);

export default router;