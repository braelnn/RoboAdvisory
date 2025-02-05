import React from 'react';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  LineElement,
  PointElement,
  LinearScale,
  CategoryScale,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import './Chart.css';

ChartJS.register(LineElement, PointElement, LinearScale, CategoryScale, Title, Tooltip, Legend);

const Chart = ({ history = [] }) => {
  const hasHistory = Array.isArray(history) && history.length > 0;

  const data = {
    labels: hasHistory ? history.map((entry) => entry.date) : [],
    datasets: [
      {
        label: 'Portfolio Value Over Time',
        data: hasHistory ? history.map((entry) => entry.value) : [],
        borderColor: '#0077b6',
        backgroundColor: 'rgba(0, 119, 182, 0.2)',
        tension: 0.4,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: 'Portfolio Performance',
      },
    },
    scales: {
      x: {
        title: {
          display: true,
          text: 'Date',
        },
      },
      y: {
        title: {
          display: true,
          text: 'Value (USD)',
        },
      },
    },
  };

  return hasHistory ? (
    <div className="chart-container">
      <Line data={data} options={options} />
    </div>
  ) : (
    <p className="no-data-message">No data available to display.</p>
  );
};

export default Chart;
