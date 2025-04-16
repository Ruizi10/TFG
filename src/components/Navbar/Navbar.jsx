import { Link } from "react-router-dom";
import "./Navbar.css";

const Navbar = () => {
    return (
        <nav className="navbar">
            <img src="/NeuroStat.png" alt="Logo de la aplicacion" className="logo"/>
            <Link to="/" className="logo"><h1 className="navbar-title">NeuroStat</h1></Link>
            <ul className="menu">
                <li><Link className="menu-link" to="/">Inicio</Link></li>
                <li><Link className="menu-link" to="/formulario">Formulario</Link></li>
                {/* Agrega más enlaces */}
            </ul>
        </nav>
    )
}
export default Navbar
