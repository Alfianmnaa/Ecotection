import React, { useEffect, useRef } from "react";
import Chart from "chart.js/auto";
import ChartDataLabels from "chartjs-plugin-datalabels";

const DoughnutChart = ({ data }) => {
  const chartRef = useRef(null);
  let myChart = null;

  useEffect(() => {
    const createOrUpdateChart = () => {
      if (chartRef && chartRef.current && data && data.length > 0) {
        if (myChart) {
          myChart.destroy(); // Destroy the previous chart instance
        }

        myChart = new Chart(chartRef.current, {
          type: "pie",
          data: {
            labels: data.map((item) => item[0]), // label provinsi
            datasets: [
              {
                label: data.map((item) => item[0]),
                data: data.map((item) => item[1]),
                backgroundColor: data.map((item, index, arr) => {
                  // temukan nilai dalam array
                  const currentIndex = arr.findIndex((el) => el[1] === item[1]);

                  // berikan warna pada chart
                  if (currentIndex === 0) {
                    return "#3366CC";
                  } else if (currentIndex === 1) {
                    return "#DC3912";
                  } else if (currentIndex === 2) {
                    return "#FF9900";
                  } else {
                    return "#109618";
                  }
                }),
              },
            ],
          },
          options: {
            scales: {},
            plugins: {
              tooltip: {
                enabled: false,
              },
              datalabels: {
                color: "white",
                font: {
                  size: 14,
                },
                formatter: (value, context) => {
                  const datapoints = context.chart.data.datasets[0].data;
                  const totalValue = datapoints.reduce((total, datapoint) => total + datapoint, 0);
                  let percentageValue = ((value / totalValue) * 100).toFixed(1);
                  percentageValue = parseFloat(percentageValue).toString();

                  return `${percentageValue}%`;
                },
              },
            },
          },
          plugins: [ChartDataLabels],
        });
      }
    };

    createOrUpdateChart();

    return () => {
      if (myChart) {
        myChart.destroy();
      }
    };
  }, [data]);

  return (
    <div className="doughnut lg:w-[520px] sm:w-[420px] w-[340px]">
      <canvas ref={chartRef} />
    </div>
  );
};

export default DoughnutChart;
