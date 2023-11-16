import { RouterProvider, createBrowserRouter } from "react-router-dom";
import App from "../App";
import Login from "../Login";
import Cadastro from "../Cadastro";
import Dashboard from "../Dashboard";
import VisualizarAtivos from "../VisualizarAtivos";
import CadastroAtivos from "../CadastroAtivos";
import AtualizarAtivos from "../EditarAtivos";
import Relatorio from "../Relatorio";
import { UseAuth } from "../contexts/Authentication";
import ProtectedRoutes from "./protectedRoutes";


function Routes() {
    const { token } = UseAuth() || {}

    const publicRoutes = [
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
        }
    ];

    const privateRoutes = [
        {
            path: "/",
            element: <ProtectedRoutes/>,
            children: [
                {
                    path: "dashboard",
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
            ]
        },
        {
            path: "/relatorio",
            element: <Relatorio/>
        }
    ]
    
    const router = createBrowserRouter([
        ...publicRoutes,
        ...(token ? privateRoutes : [])
    ]);

    return <RouterProvider router={router} />

}


export default Routes;