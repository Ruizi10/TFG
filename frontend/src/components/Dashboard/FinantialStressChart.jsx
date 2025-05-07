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

    //useEffect(() => {
    //        const fetchData = async () => {
    //            try {
    //            const response = await fetch("http://localhost:8000/estadisticas/barChart");
    //            const result = await response.json();
    //
    //            // Adaptar datos al del gráfico
    //            setData([
    //                { nivel: 1, value: result.conDepresion, value: result.sinDepresion },
    //                { nivel: 2, value: result.conDepresion, value: result.sinDepresion },
    //                { nivel: 3, value: result.conDepresion, value: result.sinDepresion },
    //                { nivel: 4, value: result.conDepresion, value: result.sinDepresion },
    //                { nivel: 5, value: result.conDepresion, value: result.sinDepresion },
    //                
    //            ]);
    //            } catch (error) {
    //                console.error("Error al obtener los datos de estrés financiero:", error);
    //            }
    //        };
    //
    //        fetchData();
    //    }, []);



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