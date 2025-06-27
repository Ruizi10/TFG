import ChartCard from "./ChartCard";
import { chartColors } from "../../utils/chartColors";
import { CHART_HEIGHT } from "../../utils/chartConfig";
import { useEffect, useState } from "react";

import {
    RadarChart,
    PolarGrid,
    PolarAngleAxis,
    PolarRadiusAxis,
    Radar,
    Tooltip,
    ResponsiveContainer,
} from "recharts";

const AcademicPressureChart = () =>{
    const [data, setData] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try{
                const response = await fetch("http://localhost:8000/estadisticas/polarAreaChart");
                const result = await response.json();

                const formattedData = result.map(item => ({
                    nivel: `${item.nivel}`,
                    ConDepresion: item.ConDepresion,
                    SinDepresion: item.SinDepresion
                }));

                setData(formattedData);
            }catch(error){
                console.error("Error al obtener datos de presión académica: ", error);
            }
        };
        fetchData();
    },[]);

    return(
        <ChartCard title="Presión académica en estudiantes">
            <ResponsiveContainer width="100%" height={CHART_HEIGHT}>
                <RadarChart cx="50%" cy="50%" outerRadius="80%" data={data}>
                    <PolarGrid />
                    <PolarAngleAxis dataKey="nivel" />
                    <PolarRadiusAxis />
                    <Tooltip />
                    <Radar 
                        name="Con Depresión"
                        dataKey="ConDepresion"
                        stroke={chartColors.depresion}
                        fill={chartColors.depresion}
                        fillOpacity={0.6}
                    /><Radar 
                        name="Sin Depresión"
                        dataKey="SinDepresion"
                        stroke={chartColors.sinDepresion}
                        fill={chartColors.sinDepresion}
                        fillOpacity={0.4}
                    />
                </RadarChart>
            </ResponsiveContainer>
        </ChartCard>
    )
};

export default AcademicPressureChart;