import React, { useEffect, useState } from "react";
import { Doughnut } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";

ChartJS.register(ArcElement, Tooltip, Legend);

interface InvestmentData {
  type: string;
  value: number;
}

const PieChartComponent: React.FC = () => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const data: InvestmentData[] = [
    {
      type: "Fundos de investimentos",
      value: 7000,
    },
    {
      type: "Tesouro direto",
      value: 18000,
    },
    {
      type: "Previdência Privada",
      value: 18000,
    },
    {
      type: "Bolsa de valuees",
      value: 7000,
    },
  ];

  const chartData = {
    labels: data.map((item) => item.type),
    datasets: [
      {
        data: data.map((item) => item.value),
        backgroundColor: ["#2567F9", "#8F3CFF", "#FF3C82", "#F1823D"],
        hoverBackgroundColor: ["#2567F9", "#8F3CFF", "#FF3C82", "#F1823D"],
      },
    ],
  };

  const legendPosition = isMobile ? ("bottom" as const) : ("right" as const);

  const options = {
    borderWidth: 0,
    plugins: {
      legend: {
        position: legendPosition,
        labels: {
          font: {
            size: 16,
            family:
              "ui-sans-serif, system-ui, sans-serif, Apple Color Emoji, Segoe UI Emoji, Segoe UI Symbol, Noto Color Emoji",
          },
          color: "#fff",
        },
      },
    },
    cutout: "80%",
    maintainAspectRatio: false,
  };
  return (
    <div className="w-auto" style={{ height: 250, padding: "3rem 0" }}>
      <Doughnut data={chartData} options={options} />
    </div>
  );
};

export default PieChartComponent;
