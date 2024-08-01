"use client";

/**
 * External dependencies.
 */
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  BarElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(BarElement, CategoryScale, LinearScale, Tooltip, Legend);

const Chart = ({ reportOne, reportTwo }) => {
  const data = {
    labels: ["Performance", "Accessibility", "Best Practices", "SEO"],
    datasets: [
      {
        label: reportOne.requestedUrl,
        data: [
          reportOne.categories.performance.score * 100,
          reportOne.categories.accessibility.score * 100,
          reportOne.categories["best-practices"].score * 100,
          reportOne.categories.seo.score * 100,
        ],
        backgroundColor: "rgba(255, 99, 132, 0.5)",
        borderColor: "rgba(255, 99, 132, 1)",
        borderWidth: 1,
      },
      {
        label: reportTwo.requestedUrl,
        data: [
          reportTwo.categories.performance.score * 100,
          reportTwo.categories.accessibility.score * 100,
          reportTwo.categories["best-practices"].score * 100,
          reportTwo.categories.seo.score * 100,
        ],
        backgroundColor: "rgba(54, 162, 235, 0.5)",
        borderColor: "rgba(54, 162, 235, 1)",
        borderWidth: 1,
      },
    ],
  };

  const options = {
    responsive: true,
    scales: {
      x: {
        stacked: false,
      },
      y: {
        beginAtZero: true,
        min: 0,
        max: 100,
        stacked: false,
      },
    },
  };

  return (
    <Bar data={data} options={options} className="max-h-[90%] min-w-full" />
  );
};

export default Chart;
