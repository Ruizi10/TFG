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


const GenderBarChart = () => {
    const [data, setData] = useState([]);

    useEffect(() => {
        const fetchData = async() => {
            try{
                const response = await fetch("http://localhost:8000/estadisticas/barChart");
                const result = await response.json();

                const formattedData = [
                    {
                        genero: "Masculino",
                        "Con Depresión": result.HombresConDepresión,
                        "Sin Depresión": result.HombresSinDepresión,
                    },
                    {
                        genero: "Femenino",
                        "Con Depresión": result.MujeresConDepresión,
                        "Sin Depresión": result.MujeresSinDepresión,
                    }
                ];
                setData(formattedData);
            }catch(error){
                console.error("Error al obtener datos de género y depresión", error);
            }
        };
        fetchData();
    }, []);

    return(
        <ChartCard title="Distribución por género y depresión">
            <ResponsiveContainer width="100%" height={CHART_HEIGHT}>
                <BarChart data={data} margin={{top: 20, right: 30, left: 0, bottom: 5}}>
                    <CartesianGrid strokeDasharray="3 3"/>
                    <XAxis dataKey="genero" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="Con Depresión" fill={chartColors.depresion} />
                    <Bar dataKey="Sin Depresión" fill={chartColors.sinDepresion} />
                </BarChart>
            </ResponsiveContainer>
        </ChartCard>
    )


}
export default GenderBarChart;