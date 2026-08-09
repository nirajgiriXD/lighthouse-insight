"use client";

/**
 * External dependencies.
 */
import { useMemo } from "react";
import { Bar } from "react-chartjs-2";
import {
  BarElement,
  CategoryScale,
  Chart as ChartJS,
  Legend,
  LinearScale,
  Tooltip,
} from "chart.js";
import type { Chart, ChartOptions, Plugin } from "chart.js";

/**
 * Internal dependencies.
 */
import {
  CATEGORY_LABELS,
  CATEGORY_ORDER,
  getCategoryScore,
  shortenUrlLabel,
} from "../../utils";
import type { LighthouseJsonReport } from "../../utils";
import { useTheme } from "../../contexts/themeContext";

ChartJS.register(BarElement, CategoryScale, LinearScale, Tooltip, Legend);

const readToken = (name: string, fallback: string) => {
  if (typeof window === "undefined") return fallback;

  const value = getComputedStyle(document.documentElement).getPropertyValue(name).trim();

  return value || fallback;
};

/**
 * Direct value labels above each bar — eight numbers is few enough to read
 * without hovering, and it keeps the exact figures available on print.
 */
const valueLabels: Plugin<"bar"> = {
  id: "valueLabels",
  afterDatasetsDraw(chart: Chart<"bar">) {
    const { ctx } = chart;
    const color = readToken("--chart-muted", "#60646f");

    ctx.save();
    ctx.font = "600 11px ui-sans-serif, system-ui, sans-serif";
    ctx.fillStyle = color;
    ctx.textAlign = "center";
    ctx.textBaseline = "bottom";

    chart.data.datasets.forEach((_dataset, datasetIndex) => {
      const meta = chart.getDatasetMeta(datasetIndex);

      if (meta.hidden) return;

      meta.data.forEach((element, index) => {
        const value = chart.data.datasets[datasetIndex]?.data[index];

        if (typeof value !== "number") return;

        ctx.fillText(String(value), element.x, element.y - 6);
      });
    });

    ctx.restore();
  },
};

export type ComparisonChartProps = {
  reportOne: LighthouseJsonReport;
  reportTwo: LighthouseJsonReport;
  urlOne: string;
  urlTwo: string;
};

const ComparisonChart = ({ reportOne, reportTwo, urlOne, urlTwo }: ComparisonChartProps) => {
  const { theme } = useTheme();

  const { data, options } = useMemo(() => {
    // Re-read on theme change so the chart follows the rest of the page.
    void theme;

    const seriesOne = readToken("--series-1", "#2a78d6");
    const seriesTwo = readToken("--series-2", "#eb6834");
    const muted = readToken("--chart-muted", "#60646f");
    const ink = readToken("--chart-ink", "#1a1e29");
    const grid = readToken("--chart-grid", "rgba(26,30,41,0.1)");
    const tooltipBackground = readToken("--chart-tooltip-bg", "#1a1e29");
    const tooltipInk = readToken("--chart-tooltip-ink", "#ffffff");

    const prefersReducedMotion =
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const chartData = {
      labels: CATEGORY_ORDER.map((category) => CATEGORY_LABELS[category]),
      datasets: [
        {
          label: shortenUrlLabel(urlOne),
          data: CATEGORY_ORDER.map((category) => getCategoryScore(reportOne, category)),
          backgroundColor: seriesOne,
          borderRadius: 4,
          maxBarThickness: 44,
          categoryPercentage: 0.62,
          barPercentage: 0.84,
        },
        {
          label: shortenUrlLabel(urlTwo),
          data: CATEGORY_ORDER.map((category) => getCategoryScore(reportTwo, category)),
          backgroundColor: seriesTwo,
          borderRadius: 4,
          maxBarThickness: 44,
          categoryPercentage: 0.62,
          barPercentage: 0.84,
        },
      ],
    };

    const chartOptions: ChartOptions<"bar"> = {
      responsive: true,
      maintainAspectRatio: false,
      animation: prefersReducedMotion ? false : { duration: 600 },
      layout: { padding: { top: 20 } },
      interaction: { mode: "index", intersect: false },
      scales: {
        x: {
          grid: { display: false },
          border: { color: grid },
          ticks: { color: muted, font: { size: 12 } },
        },
        y: {
          beginAtZero: true,
          min: 0,
          max: 100,
          border: { display: false },
          grid: { color: grid },
          ticks: { color: muted, stepSize: 25, font: { size: 11 } },
          title: { display: true, text: "Score (0–100)", color: muted, font: { size: 11 } },
        },
      },
      plugins: {
        legend: {
          position: "top",
          align: "start",
          labels: {
            color: ink,
            usePointStyle: true,
            pointStyle: "circle",
            boxWidth: 8,
            boxHeight: 8,
            padding: 18,
            font: { size: 12 },
          },
        },
        tooltip: {
          backgroundColor: tooltipBackground,
          titleColor: tooltipInk,
          bodyColor: tooltipInk,
          padding: 12,
          cornerRadius: 8,
          displayColors: true,
          usePointStyle: true,
          callbacks: {
            label: (context) =>
              ` ${context.dataset.label}: ${
                context.parsed.y === null ? "no score" : `${context.parsed.y} / 100`
              }`,
          },
        },
      },
    };

    return { data: chartData, options: chartOptions };
  }, [reportOne, reportTwo, urlOne, urlTwo, theme]);

  return (
    <div className="h-72 w-full sm:h-80 lg:h-96">
      <Bar
        data={data}
        options={options}
        plugins={[valueLabels]}
        aria-label={`Lighthouse category scores for ${shortenUrlLabel(urlOne)} compared with ${shortenUrlLabel(urlTwo)}`}
      />
    </div>
  );
};

export default ComparisonChart;
