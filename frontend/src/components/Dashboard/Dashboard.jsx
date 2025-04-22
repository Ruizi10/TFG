import DepresionChart from './DepresionChart';
import FinantialStressChart from './FinantialStressChart';
import FactorsRadarChart from './FactorsRadarChart';

import "./Dashboard.css"


const Dashboard = () => {
    return (
        <div className="dashboard">
            <h2 className='dashboard-title'>Gráficos de interés</h2>
            <div className="chart-grid">
                <DepresionChart />
                <FinantialStressChart />
                <FactorsRadarChart />
                {/* Más gráficos a futuro*/}
            </div>
        </div>
    )
}

export default Dashboard;