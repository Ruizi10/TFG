import ChartCard from "./ChartCard";
import { chartColors } from "../../utils/chartColors";
import { CHART_HEIGHT } from "../../utils/chartConfig";
import {
    RadarChart,
    PolarGrid,
    PolarAngleAxis,
    PolarRadiusAxis,
    Radar,
    Legend,
    Tooltip,
    ResponsiveContainer,
} from "recharts";



//comparativa de factores en estudiantes con y sin depresión
const data = [
    {
        factor: "Sueño",
        ConDepresion: 2,
        SinDepresion: 4,
    },
    {
        factor: "Alimentación",
        ConDepresion: 2,
        SinDepresion: 4.0,
    },
    {
        factor: "Satisfacción",
        ConDepresion: 1,
        SinDepresion: 4,
    },
    {
        factor: "Presión",
        ConDepresion: 4,
        SinDepresion: 2,
    },
    {
        factor: "Estrés financiero",
        ConDepresion: 4,
        SinDepresion: 2,
    },
];

const FactorsRadarChart = () => {
    return (
        <ChartCard title="Factores del estudiante" className="wide-chart-card">
            <ResponsiveContainer width="100%" height={CHART_HEIGHT}>
                <RadarChart cx="50%" cy="50%" outerRadius="80%" data={data}>

                    <PolarGrid />
                    <PolarAngleAxis dataKey="factor" />
                    <PolarRadiusAxis angle={30} domain={[0, 5]} />

                    <Radar
                        name="Con depresión"
                        dataKey="ConDepresion"
                        stroke={chartColors.depresion}
                        fill={chartColors.depresion}
                        fillOpacity={0.6}
                    />

                    <Radar
                        name="Sin depresión"
                        dataKey="SinDepresion"
                        stroke={chartColors.sinDepresion}
                        fill={chartColors.sinDepresion}
                        fillOpacity={0.6}
                    />

                    <Legend />
                    <Tooltip />
                </RadarChart>
            </ResponsiveContainer>
        </ChartCard>
    );
};

export default FactorsRadarChart;