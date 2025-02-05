import React from 'react';
import { Line, Pie, Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  LineElement,
  PointElement,
  BarElement,
  ArcElement, // Required for Pie or Doughnut charts
  LinearScale,
  CategoryScale,
  Tooltip,
  Legend,
  Title,
} from 'chart.js';
import './AnaChart.css';

// Register all necessary Chart.js components
ChartJS.register(
  LineElement,
  PointElement,
  BarElement,
  ArcElement, // Ensure ArcElement is registered for Pie charts
  LinearScale,
  CategoryScale,
  Tooltip,
  Legend,
  Title
);

const AnaChart = ({ chartType, data, options }) => {
  let ChartComponent;

  switch (chartType) {
    case 'line':
      ChartComponent = Line;
      break;
    case 'pie':
      ChartComponent = Pie;
      break;
    case 'bar':
      ChartComponent = Bar;
      break;
    default:
      return <p>Invalid chart type provided.</p>;
  }

  return (
    <div className="ana-chart-container">
      <ChartComponent data={data} options={options} />
    </div>
  );
};

export default AnaChart;

