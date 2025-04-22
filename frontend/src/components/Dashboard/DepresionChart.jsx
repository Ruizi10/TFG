import ChartCard from "./ChartCard";
import { chartColors } from "../../utils/chartColors";
import { CHART_HEIGHT } from "../../utils/chartConfig";

import {
    PieChart,
    Pie,
    Cell,
    Tooltip,
    Legend,
    ResponsiveContainer
} from 'recharts';


const data = [
    { name: 'Con Depresion', value: 35 },
    { name: 'Sin Depresion', value: 65 }
];


const COLORS = [chartColors.depresion, chartColors.sinDepresion];

const DepresionChart = () => {
return (
        <ChartCard title="Distribución de casos de depresión">
            <ResponsiveContainer width="100%" height={CHART_HEIGHT}>
            <PieChart>
            <Pie
                data={data}
                cx="50%" //centrar gráfico
                cy="50%"
                outerRadius={100} //tamaño radio
                label //valores
                dataKey="value"
            >
                {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
            </Pie>
            <Tooltip />
            <Legend />
            </PieChart>
            </ResponsiveContainer>
        </ChartCard>
    );
};

export default DepresionChart;