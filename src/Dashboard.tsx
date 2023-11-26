import { faBars, faChartColumn, faFilePen, faRightFromBracket } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "./assets/styles/dashboard.scss";
import { useContext, useEffect, useState } from "react";
import { Link, Outlet } from "react-router-dom";
import api from "./services/api";
import { AuthContext } from "./contexts/Authentication";
import { AxiosError } from "axios";
import { toast } from "react-toastify";

function Dashboard() {
    const [name, setName] = useState<string>();
    const [menuPosition, setMenuPosition] = useState<string>("-100%");
    const auth = useContext(AuthContext);
    const moveMenu = () => {
        setMenuPosition(menuPosition === "-100%" ? "0px" : "-100%");
    }

    useEffect(() => {
        async function getUserName() {
            try {
                const res = await api.get("/clientes/id");

                if (res.status == 200) {
                    setName(res.data.nomeUsuario);
                }
            }
            catch (err) {
                if (err instanceof AxiosError) {
                    if (err.response?.status === 204) {
                        toast.warn("Usuário não encontrado", {
                            position: "bottom-right",
                            autoClose: 3000,
                            hideProgressBar: true,
                            closeOnClick: true,
                            theme: "colored",
                        });
                    }
                    else if (err.response?.status === 500) {
                        toast.error("Erro de servidor, contacte os desenvolvedores imediatamente", {
                            position: "bottom-right",
                            autoClose: 3000,
                            hideProgressBar: true,
                            closeOnClick: true,
                            theme: "colored",
                        });
                    }
                }
            }
        }

        getUserName();
    }, []);

    return (
        <>
            <header className="dashboard-header">
                <button onClick={moveMenu}>
                    <FontAwesomeIcon icon={faBars} />
                </button>
                <h1>Seja bem-vindo <span>{name?.toUpperCase()}</span> &#128075;</h1>
                <nav style={{ left: menuPosition }}>
                    <ul>
                        <li>
                            <Link to="/dashboard" onClick={moveMenu}>
                                <span>
                                    <FontAwesomeIcon icon={faChartColumn} />
                                </span>
                                <span>Dashboard</span>
                            </Link>
                        </li>
                        <li>
                            <Link to="registrar" onClick={moveMenu}>
                                <span>
                                    <FontAwesomeIcon icon={faFilePen} />
                                </span>
                                <span>Registrar</span>
                            </Link>
                        </li>
                        <li>
                            <button onClick={() => auth?.Logout()}>
                                <span>
                                    <FontAwesomeIcon icon={faRightFromBracket} flip="horizontal" />
                                </span>
                                <span>Sair</span>
                            </button>
                        </li>
                    </ul>
                </nav>
            </header>

            <Outlet />

        </>
    );
}

export default Dashboard;