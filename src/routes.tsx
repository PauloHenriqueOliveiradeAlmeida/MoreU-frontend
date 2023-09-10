import { createBrowserRouter } from "react-router-dom";
import App from "./App";
import Login from "./Login";
import Cadastro from "./Cadastro";
import Dashboard from "./Dashboard";
import VisualizarAtivos from "./VisualizarAtivos";
import CadastroAtivos from "./CadastroAtivos";
import AtualizarAtivos from "./EditarAtivos";

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
        element: <Dashboard/>,
        children: [
            {
                index: true,
                element: <VisualizarAtivos/>
            },
            {
                path: "registrar",
                element: <CadastroAtivos/>
            },
            {
                path: "atualizar",
                element: <AtualizarAtivos/>
            }
        ]
    }
]);

export default router;