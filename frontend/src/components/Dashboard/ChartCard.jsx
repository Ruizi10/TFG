import "./ChartCard.css";

const ChartCard = ({ title, children, className ="" }) => {
    return (
        <div className={`chart-card ${className}`}>
            <h3>{title}</h3>
            <div className="chart-content">
                {children}
            </div>
        </div>
    );
};

export default ChartCard;
