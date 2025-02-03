import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const SalesByTime = () => {
  const data = {
    labels: ["08:00", "10:00", "12:00", "14:00", "16:00", "18:00"],
    datasets: [
      {
        label: "어제",
        data: [12, 34, 56, 78, 65, 43],
        fill: false,
        borderColor: "red",
        tension: 0.1,
      },
      {
        label: "오늘",
        data: [21, 31, 52, 99, 123],
        fill: false,
        borderColor: "blue",
        tension: 0.1,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspenctRatio: false,
    plugins: {
      title: {
        display: false,
        text: "시간별 판매량",
      },
    },
    scales: {
      x: {
        display: true,
        ticks: {
          display: true,
          color: "#000",
        },
        font: {
          size: 12,
          family: "Arial, sans-serif",
          weight: 400,
        },
        grid: {
          display: false,
        },
      },
      y: {
        display: false,
        ticks: {
          display: true,
          color: "#000",
        },
        font: {
          size: 12,
          family: "Arial, sans-serif",
          weight: 400,
        },
        grid: {
          display: false,
        },
      },
    },
  };

  return (
    <div className="report-component">
      <div className="report-title">시간대별 판매량</div>
      <div className="predict-detail">어제와 오늘 시간대별 매출 차이에요</div>

      <div className="compare-chart">
        <Line data={data} options={options} />
      </div>
    </div>
  );
};

export default SalesByTime;
