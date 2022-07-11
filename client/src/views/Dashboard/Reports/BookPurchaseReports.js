import React, { useEffect, useState } from "react";
import {
  bookPurchasesByReaders,
  bookPurchasesByBooks,
} from "../../../store/actions/actions";
import MUIDataTable from "mui-datatables";
import { useSelector, useDispatch } from "react-redux";
import ApexCharts from "apexcharts";
import Chart from "react-apexcharts";
import { Row } from "antd";
import "../../../style/stats.scss";

export const BookPurchaseReports = ({ startDate, endDate }) => {
  const [bookPurchasesByReadersLabels, setBookPurchasesByReadersLabels] =
    useState([]);
  const [bookPurchasesByReadersData, setBookPurchasesByReadersData] = useState(
    []
  );
  const [bookPurchasesByBooksLabels, setBookPurchasesByBooksLabels] = useState(
    []
  );
  const [bookPurchasesByBooksData, setBookPurchasesByBooksData] = useState([]);
  const bookPurchasesByReadersResponse = useSelector(
    ({ reports }) => reports.bookPurchasesByReaders
  );
  const bookPurchasesByBooksResponse = useSelector(
    ({ reports }) => reports.bookPurchasesByBooks
  );

  const dispatch = useDispatch();

  useEffect(() => {
    if (startDate || endDate) {
      dispatch(
        bookPurchasesByReaders({
          startDate: startDate ? startDate : undefined,
          endDate: endDate ? endDate : undefined,
        })
      );
      dispatch(
        bookPurchasesByBooks({
          startDate: startDate ? startDate : undefined,
          endDate: endDate ? endDate : undefined,
        })
      );
    }
  }, []);

  useEffect(() => {
    if (bookPurchasesByReadersResponse) {
      switch (true) {
        case bookPurchasesByReadersResponse.loading:
          break;
        case bookPurchasesByReadersResponse.success:
          const bookPurchasesByReadersLabels =
            bookPurchasesByReadersResponse.data.bookPurchases.map(
              (value) => value[0]
            );
          const bookPurchasesByReadersData =
            bookPurchasesByReadersResponse.data.bookPurchases.map(
              (value) => value[1]
            );
          setBookPurchasesByReadersLabels(bookPurchasesByReadersLabels);
          setBookPurchasesByReadersData(bookPurchasesByReadersData);
          break;
        case bookPurchasesByReadersResponse.error:
          break;
      }
    }
  }, [bookPurchasesByReadersResponse]);

  useEffect(() => {
    if (bookPurchasesByBooksResponse) {
      switch (true) {
        case bookPurchasesByBooksResponse.loading:
          break;
        case bookPurchasesByBooksResponse.success:
          const bookPurchasesByBooksLabels =
            bookPurchasesByBooksResponse.data.bookPurchases.map(
              (value) => value[0]
            );
          const bookPurchasesByBooksData =
            bookPurchasesByBooksResponse.data.bookPurchases.map(
              (value) => value[1]
            );
          setBookPurchasesByBooksLabels(bookPurchasesByBooksLabels);
          setBookPurchasesByBooksData(bookPurchasesByBooksData);
          break;
        case bookPurchasesByBooksResponse.error:
          break;
      }
    }
  }, [bookPurchasesByBooksResponse]);

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
        categories: bookPurchasesByReadersLabels,
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
        name: "Book Purchases",
        data: bookPurchasesByReadersData,
      },
    ],
  };

  const genreChartData = {
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
        categories: bookPurchasesByBooksLabels,
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
        name: "Book Purchases",
        data: bookPurchasesByBooksData,
      },
    ],
  };

  if (
    bookPurchasesByReadersResponse.loading ||
    bookPurchasesByBooksResponse.loading
  ) {
    return <div class="Stats-loader">Loading...</div>;
  }
  return (
    <>
      <Row xs={24} sm={24} md={24} lg={24} className="mb-5">
        <div className="content-heading">
          <div>Book Purchases By Readers</div>
        </div>
        <Chart {...chartData} />
      </Row>
      <Row xs={24} sm={24} md={24} lg={24} className="mb-5">
        <div className="content-heading">
          <div>Number of times book purchased</div>
        </div>
        <Chart {...genreChartData} />
      </Row>
    </>
  );
};
