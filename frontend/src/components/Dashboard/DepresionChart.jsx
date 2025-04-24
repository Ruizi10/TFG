import ChartCard from "./ChartCard";
import { chartColors } from "../../utils/chartColors";
import { CHART_HEIGHT } from "../../utils/chartConfig";
import { useEffect, useState } from "react";

import {
    PieChart,
    Pie,
    Cell,
    Tooltip,
    Legend,
    ResponsiveContainer
} from 'recharts';

const COLORS = [chartColors.depresion, chartColors.sinDepresion];

const DepresionChart = () => {
    // const data = [
    //     { name: 'Con Depresion', value: 35 },
    //     { name: 'Sin Depresion', value: 65 }
    // ];

    const [data, setData] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
            const response = await fetch("http://localhost:8000/estadisticas/pieChart");
            const result = await response.json();

            // Adaptar datos al formato requerido por el gráfico
            setData([
                { name: "Con Depresión", value: result.conDepresion },
                { name: "Sin Depresión", value: result.sinDepresion }
            ]);
            } catch (error) {
                console.error("Error al obtener los datos:", error);
            }
        };

        fetchData();
    }, []);

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
                {data.map((_, index) => (
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