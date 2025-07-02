import { useState, useEffect } from "react";
import "./KPIStats.css";
import CountUp from 'react-countup';

const KPIStats = () => {
    const [stats, setStats] = useState({
        totalUsuarios: 0,
        porcentajeDepresion: 0,
        satisfaccionPromedio: 0,
        HorasEstudioPromedio: 0,
        EstresPromedio: 0,
    });

    useEffect(() => {
        const fetchKPIs = async () => {
            try {
                const response = await fetch("http://localhost:8000/estadisticas/kpi");
                const data = await response.json();
                setStats(data);
            } catch (error) {
                console.error("Error al obtener las KPIs:", error);
            }
        };
        fetchKPIs();
    }, []);

    return (
        <div className="kpi-container">
            <div className="kpi-card">
                <h3>Usuarios evaluados</h3>
                <CountUp className="count" end={stats.totalUsuarios} duration={2} separator="." />
            </div>
            <div className="kpi-card">
                <h3>% con depresión</h3>
                <CountUp className="count" end={stats.porcentajeDepresion} duration={2} decimals={1} suffix="%" />
            </div>
            <div className="kpi-card">
                <h3>Satisfacción en estudios</h3>
                <CountUp className="count" end={stats.satisfaccionPromedio} duration={2} decimals={1} />
            </div>
            <div className="kpi-card">
                <h3>Horas de estudio</h3>
                <CountUp className="count" end={stats.HorasEstudioPromedio} duration={2} decimals={1} />
            </div>
            <div className="kpi-card">
                <h3>Estrés financiero</h3>
                <CountUp className="count" end={stats.EstresPromedio} duration={2} decimals={1} />
            </div>
        </div>
    );
}

export default KPIStats;