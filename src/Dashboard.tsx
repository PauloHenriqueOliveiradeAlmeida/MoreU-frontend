import { faBars, faChartColumn, faFilePen, faRightFromBracket } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "./assets/styles/dashboard.scss";
import { useState } from "react";
import { Link, Outlet } from "react-router-dom";

function Dashboard() {
    const [menuPosition, setMenuPosition] = useState<string>("-100%");

    const moveMenu = () => {
        setMenuPosition(menuPosition === "-100%" ? "0px" : "-100%");
    }

    return (
        <>
            <header className="dashboard-header">
                <button onClick={moveMenu}>
                    <FontAwesomeIcon icon={faBars} />
                </button>
                <h1>Seja bem-vindo &#128075;</h1>
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
                            <Link to="/">
                                <span>
                                    <FontAwesomeIcon icon={faRightFromBracket} flip="horizontal" />
                                </span>
                                <span>Sair</span>
                            </Link>
                        </li>
                    </ul>
                </nav>
            </header>

            <Outlet />

        </>
    );
}

export default Dashboard;