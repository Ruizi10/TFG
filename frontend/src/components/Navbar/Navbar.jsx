import { Link } from "react-router-dom";

import "./Navbar.css";

const Navbar = () => {
    return (
        <nav className="navbar">
            <div className="navbar-header">
                <img src="/NeuroStat.png" alt="Logo de la aplicacion" className="logo" />
                <Link to="/" className="logo-link">
                    <h1 className="navbar-title">NeuroStat</h1>
                </Link>
            </div>
            <ul className="menu">
                <li><Link className="menu-link" to="/">Inicio</Link></li>
                <li><Link className="menu-link" to="/prediction">Autoevaluación</Link></li>
                <li><Link className="menu-link" to="/news">Noticias</Link></li>
                <li><Link className="menu-link" to="/dashboard">Tablero de estadísticas</Link></li>
            </ul>
        </nav>
    )
}
export default Navbar;
