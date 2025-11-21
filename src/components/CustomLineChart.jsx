import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LabelList } from "recharts";

const CustomLineChart = ({ data }) => {
    return (
        <div className="w-full h-64">
            <ResponsiveContainer width="100%" height="100%">
                <LineChart data={data} margin={{ top: 20, right: 20, left: 0, bottom: 10 }}>
                    <CartesianGrid strokeDasharray="3 3" opacity={0.2} />
                    <XAxis dataKey="date" tick={{ fontSize: 12 }} />
                    <YAxis tick={{ fontSize: 12 }} />

                    <Tooltip />

                    <Line
                        type="monotone"
                        dataKey="amount"
                        stroke="#7c3aed" 
                        strokeWidth={3}
                        dot={{ r: 4, fill: "#7c3aed" }}
                        activeDot={{ r: 6 }}
                    >
                        {/* Show numbers above points */}
                        <LabelList dataKey="amount" position="top" offset={10} fill="#7c3aed" fontSize={12} />
                    </Line>

                </LineChart>
            </ResponsiveContainer>
        </div>
    );
};

export default CustomLineChart;
