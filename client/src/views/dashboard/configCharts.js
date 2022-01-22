export const config_Bar = (data) => {
  let arrSoTienV = Object.values(data.map((item) => item.SoTienV / 1000000));
  let arrChiPhi = Object.values(data.map((item) => item.ChiPhi / 1000000));

  return {
    options: {
      colors: ["#2E93fA", "#FF9800"],
      dataLabels: {
        enabled: false,
        enabledOnSeries: false,
        textAnchor: "middle",
        distributed: false,
        style: {
          fontSize: "14px",
          fontFamily: "Helvetica, Arial, sans-serif",
          fontWeight: "bold",
        },
      },
      chart: {
        type: "bar",
        height: 350,
        stacked: false,
        toolbar: {
          show: true,
        },
        zoom: {
          enabled: true,
        },
      },
      responsive: [
        {
          breakpoint: 480,
          options: {
            legend: {
              position: "bottom",
              offsetX: 0,
              offsetY: 30,
              horizontalAlign: "left",
              floating: true,
            },
            dataLabels: {
              enabled: false,
            },
          },
        },
      ],
      plotOptions: {
        bar: {
          horizontal: false,
          borderRadius: 0,
        },
      },
      xaxis: {
        categories: data.map((item) => item.XeVC),
      },
      yaxis: {
        show: true,
        showAlways: true,
        labels: {
          show: true,

          formatter: (val) => {
            return Math.round(val * 10) / 10 + " tr";
          },
        },
      },
      legend: {
        position: "bottom",
        horizontalAlign: "center",
      },
    },
    series: [
      {
        name: "Số tiền",
        data: arrSoTienV,
      },
      {
        name: "Chi phí",
        data: arrChiPhi,
      },
    ],
  };
};
