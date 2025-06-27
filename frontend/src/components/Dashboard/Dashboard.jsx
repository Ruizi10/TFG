import DepresionChart from './DepresionPieChart';
import GenderBarChart from './GenderBarChart';
import AcademicPressureChart from './AcademicPressureChart';

import "./Dashboard.css"
import SatisfactionChart from './SatisfactionChart';



const Dashboard = () => {
    return (
        <div className="dashboard">
            <h2 className='dashboard-title'>Gráficos de interés</h2>
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