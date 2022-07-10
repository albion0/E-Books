import React, { useEffect, useState } from "react";
import { paymentsByReaders } from "../../../store/actions/actions";
import MUIDataTable from "mui-datatables";
import { useSelector, useDispatch } from "react-redux";
import ApexCharts from "apexcharts";
import Chart from "react-apexcharts";
import { Row } from "antd";
import "../../../style/stats.scss";

export const PaymentReports = ({ startDate, endDate }) => {
  const [paymentsByReadersLabels, setPaymentsByReadersLabels] = useState([]);
  const [paymentsByReadersData, setPaymentsByReadersData] = useState([]);
  const paymentsByReadersResponse = useSelector(
    ({ reports }) => reports.paymentsByReaders
  );

  const dispatch = useDispatch();

  useEffect(() => {
    if (startDate || endDate) {
      dispatch(
        paymentsByReaders({
          startDate: startDate ? startDate : undefined,
          endDate: endDate ? endDate : undefined,
        })
      );
    }
  }, []);

  useEffect(() => {
    if (paymentsByReadersResponse) {
      switch (true) {
        case paymentsByReadersResponse.loading:
          break;
        case paymentsByReadersResponse.success:
          const paymentsByReadersLabels =
            paymentsByReadersResponse.data.payments.map((value) => value[0]);
          const paymentsByReadersData =
            paymentsByReadersResponse.data.payments.map((value) => value[1]);
          setPaymentsByReadersLabels(paymentsByReadersLabels);
          setPaymentsByReadersData(paymentsByReadersData);
          break;
        case paymentsByReadersResponse.error:
          break;
      }
    }
  }, [paymentsByReadersResponse]);

  const chartData = {
    height: 480,
    type: "bar",
    options: {
      chart: {
        id: "bar-chart",
        stacked: true,
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
              offsetX: -10,
              offsetY: 0,
            },
          },
        },
      ],
      plotOptions: {
        bar: {
          horizontal: false,
          columnWidth: "50%",
        },
      },
      xaxis: {
        type: "category",
        categories: paymentsByReadersLabels,
      },
      legend: {
        show: true,
        fontSize: "14px",
        fontFamily: `'Roboto', sans-serif`,
        position: "bottom",
        offsetX: 20,
        labels: {
          useSeriesColors: false,
        },
        markers: {
          width: 16,
          height: 16,
          radius: 5,
        },
        itemMargin: {
          horizontal: 15,
          vertical: 8,
        },
      },
      fill: {
        type: "solid",
      },
      dataLabels: {
        enabled: false,
      },
      grid: {
        show: true,
      },
    },
    series: [
      {
        name: "Books",
        data: paymentsByReadersData,
      },
    ],
  };

  if (paymentsByReadersResponse.loading) {
    return <div class="Stats-loader">Loading...</div>;
  }
  return (
    <>
      <Row xs={24} sm={24} md={24} lg={24} className="mb-5">
        <div className="content-heading">
          <div>Payments By Readers</div>
        </div>
        <Chart {...chartData} />
      </Row>
    </>
  );
};
