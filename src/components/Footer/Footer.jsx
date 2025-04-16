import "./Footer.css";

const Footer = () => {
    return (
        <footer className="foot">
            <p>© 2025 <strong>NeuroStat</strong> - Proyecto Fin de Grado</p>
            <div className="footer-tech">
                <img src="/icons/react.svg" alt="React" title="React" />
                <img src="/icons/fastapi.svg" alt="FastAPI" title="FastAPI" />
                <img src="/icons/python.svg" alt="Python" title="Python" />
                <img src="/icons/css.svg" alt="CSS" title="CSS" />
            </div>

            <p className="footer-contact">myhealth@neurostat.app</p>
            <p className="footer-advise"><strong>Esta aplicación no sustituye el diagnóstico profesional ni médico</strong></p>
        </footer>
    )
}
export default Footer;