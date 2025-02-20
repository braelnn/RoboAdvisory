import React from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const ChartDisplay = ({ data }) => {
    const chartData = {
        labels: data.map(report => report.title),
        datasets: [
            {
                label: 'Performance',
                data: data.map(report => report.value),
                backgroundColor: '#0077B5',
            },
        ],
    };

    return <Bar data={chartData} />;
};

export default ChartDisplay;
