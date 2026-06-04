import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from "recharts";

const COLORS = [
    "#2563eb",
    "#16a34a",
    "#dc2626",
    "#ca8a04",
    "#9333ea",
    "#0891b2"
];

function LanguageChart({ repos }) {

    const languageCounts = {};

    repos.forEach(repo => {

        const language = repo.language || "Unknown";

        languageCounts[language] = (languageCounts[language] || 0) + 1;

    });

    const chartData = Object.entries(languageCounts).map(([name, value]) => ({ name, value }));

    if (chartData.length === 0) return null;

    return (

        <div className="bg-white rounded-xl shadow-md p-4 mt-4">

            <h2 className="text-xl font-bold mb-4">
                Language Distribution
            </h2>

            <ResponsiveContainer width="100%" height={200}>

                <PieChart>

                    <Pie data={chartData} dataKey="value" nameKey="name" outerRadius={70}>

                        {chartData.map((_, index) => (

                            <Cell key={index} fill={COLORS[index % COLORS.length]} />

                        ))}

                    </Pie>

                    <Tooltip />

                    <Legend />

                </PieChart>

            </ResponsiveContainer>

        </div >

    );
}

export default LanguageChart;