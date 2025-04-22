import ChartCard from "./ChartCard";
import { chartColors } from "../../utils/chartColors";
import { CHART_HEIGHT } from "../../utils/chartConfig";

import { 
    BarChart, 
    Bar, 
    XAxis, 
    YAxis, 
    Tooltip, 
    Legend, 
    ResponsiveContainer, 
    CartesianGrid 
} from "recharts";


const data = [
    { nivel: "1", conDepresion: 8, sinDepresion: 5 },
    { nivel: "2", conDepresion: 15, sinDepresion: 10 },
    { nivel: "3", conDepresion: 30, sinDepresion: 20 },
    { nivel: "4", conDepresion: 22, sinDepresion: 18 },
    { nivel: "5", conDepresion: 10, sinDepresion: 7 },
];

const FinantialStressChart = () => {
    return (
        <ChartCard title="Nivel de Estrés Financiero">
            <ResponsiveContainer width="100%" height={CHART_HEIGHT}>
                <BarChart data={data} margin={{top:20, right:30, left:20, bottom:5}}>

                    <CartesianGrid strokeDasharray="3" />
                    <XAxis dataKey="nivel" label={{ value: "Nivel", position: "insideBottom", offset: -10 }} />
                    <YAxis label={{ value: "Estudiantes", angle: -90, position: "insideLeft", offset: 10 }} />
                    <Tooltip />
                    <Legend wrapperStyle={{ paddingTop: 20 }} />

                    <Bar dataKey="conDepresion" fill={chartColors.depresion} name="Con depresión" />
                    <Bar dataKey="sinDepresion" fill={chartColors.sinDepresion} name="Sin depresión" />

                </BarChart>
            </ResponsiveContainer>
        </ChartCard>
    )
}

export default FinantialStressChart;