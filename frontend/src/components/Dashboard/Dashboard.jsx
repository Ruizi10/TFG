import DepresionChart from './DepresionPieChart';
import GenderBarChart from './GenderBarChart';
import AcademicPressureChart from './AcademicPressureChart';

import "./Dashboard.css"
import SatisfactionChart from './SatisfactionChart';
import KPIStats from './KPIStats';



const Dashboard = () => {
    return (
        <div className="dashboard">

            <h2 className='dashboard-title'>Dashboard de Salud Mental Estudiantil</h2>
            <KPIStats />
            <div className="chart-grid">
                <DepresionChart />
                <GenderBarChart />
                <AcademicPressureChart />
                <SatisfactionChart />
                {/* Más gráficos a futuro*/}
            </div>
        </div>
    )
}

export default Dashboard;