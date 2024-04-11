import React, { useEffect, useRef } from "react";
import Chart from "chart.js/auto";
import ChartDataLabels from "chartjs-plugin-datalabels";

const BarChartY = ({ data }) => {
  const chartRef = useRef(null);
  const charInstance = useRef(null);

  useEffect(() => {
    if (charInstance.current) {
      charInstance.current.destroy();
    }
    const positive = 30;
    const negative = 100 - positive;

    const myChartRef = chartRef.current.getContext("2d");
    charInstance.current = new Chart(myChartRef, {
      type: "bar",
      data: {
        labels: data.map((item) => item[0]),
        datasets: [
          {
            label: "Jumlah laporan Aktivitas Ilegal",
            data: data.map((item) => item[1]), // Extract values from data
            backgroundColor: data.map((item, index, arr) => {
              // Find index of current value within the data array
              const currentIndex = arr.findIndex((el) => el[1] === item[1]);

              // Assign color based on index
              if (currentIndex === 0) {
                return "#3366CC"; // First occurrence, green
              } else if (currentIndex === 1) {
                return "#DC3912"; // Second occurrence, light green
              } else if (currentIndex === 2) {
                return "#FF9900"; // Third occurrence, yellow
              } else {
                return "#109618"; // Fourth and beyond, red
              }
            }),
          },
        ],
      },
    });
    return () => {
      if (charInstance.current) {
        charInstance.current.destroy();
      }
    };
  }, [data]);

  return (
    <div className="doughnut 2xl:w-[600px] md:w-[540px] sm:w-[400px] w-[320px]">
      <canvas ref={chartRef} />
    </div>
  );
};

export default BarChartY;
