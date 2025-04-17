import './DepresionChart.css';

const data = [
{ name: 'Con depresión', value: 35 },
{ name: 'Sin depresión', value: 65 }
];

const COLORS = ['#d32f2f', '#388e3c'];

const DepresionChart = () => {
return (
    <div className="chart-container">
    <h3>Distribución de casos de depresión</h3>
    <ResponsiveContainer width="100%" height={300}>
        <PieChart>
        <Pie
            data={data}
            cx="50%"
            cy="50%"
            outerRadius={80}
            label
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
    </div>
);
};

export default DepresionChart;