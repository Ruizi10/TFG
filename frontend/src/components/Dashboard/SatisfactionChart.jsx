import ChartCard from "./ChartCard";
import { chartColors } from "../../utils/chartColors";
import { CHART_HEIGHT } from "../../utils/chartConfig";
import { useEffect, useState } from "react";

import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    Tooltip,
    Legend,
    ResponsiveContainer,
    CartesianGrid,
} from "recharts";

const SatisfactionChart = () => {
    const [data, setData] = useState([]);

    useEffect (() => {
        const fetchData = async () => {
            try{
                const response = await fetch("http://localhost:8000/estadisticas/satisfactionChart");
                const result = await response.json();
                const formatted = result.map(item => ({
                    nivel: `${item.nivel}`,
                    "Con depresión" : item.ConDepresion,
                    "Sin depresión" : item.SinDepresion,
                }));

                setData(formatted);
            }catch(error){
                console.error("Error al obtener datos de satisfacción: ", error);
            }
        };
        fetchData();

    }, []);

    return(
        <ChartCard title="Satisfaccion con los estudios y depresión">
            <ResponsiveContainer width="100%" height={CHART_HEIGHT}>
                <BarChart data={data} margin={{top:  20, right: 30, left: 0, bottom: 5}}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="nivel" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="Con depresión" fill={chartColors.depresion}/>
                    <Bar dataKey="Sin depresión" fill={chartColors.sinDepresion}/>
                </BarChart>
            </ResponsiveContainer>
        </ChartCard>
    );
};

export default SatisfactionChart;