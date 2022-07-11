import React, { useEffect, useState } from "react";
import {
  reviewsByReaders,
  reviewsByBooks,
} from "../../../store/actions/actions";
import MUIDataTable from "mui-datatables";
import { useSelector, useDispatch } from "react-redux";
import ApexCharts from "apexcharts";
import Chart from "react-apexcharts";
import { Row } from "antd";
import "../../../style/stats.scss";

export const ReviewReports = ({ startDate, endDate }) => {
  const [reviewsByReadersLabels, setReviewsByReadersLabels] = useState([]);
  const [reviewsByReadersData, setReviewsByReadersData] = useState([]);
  const [reviewsByBooksLabels, setReviewsByBooksLabels] = useState([]);
  const [reviewsByBooksData, setReviewsByBooksData] = useState([]);
  const reviewsByReadersResponse = useSelector(
    ({ reports }) => reports.reviewsByReaders
  );
  const reviewsByBooksResponse = useSelector(
    ({ reports }) => reports.reviewsByBooks
  );

  const dispatch = useDispatch();

  useEffect(() => {
    if (startDate || endDate) {
      dispatch(
        reviewsByReaders({
          startDate: startDate ? startDate : undefined,
          endDate: endDate ? endDate : undefined,
        })
      );
      dispatch(
        reviewsByBooks({
          startDate: startDate ? startDate : undefined,
          endDate: endDate ? endDate : undefined,
        })
      );
    }
  }, []);

  useEffect(() => {
    if (reviewsByReadersResponse) {
      switch (true) {
        case reviewsByReadersResponse.loading:
          break;
        case reviewsByReadersResponse.success:
          const reviewsByReadersLabels =
            reviewsByReadersResponse.data.reviews.map((value) => value[0]);
          const reviewsByReadersData =
            reviewsByReadersResponse.data.reviews.map((value) => value[1]);
          setReviewsByReadersLabels(reviewsByReadersLabels);
          setReviewsByReadersData(reviewsByReadersData);
          break;
        case reviewsByReadersResponse.error:
          break;
      }
    }
  }, [reviewsByReadersResponse]);

  useEffect(() => {
    if (reviewsByBooksResponse) {
      switch (true) {
        case reviewsByBooksResponse.loading:
          break;
        case reviewsByBooksResponse.success:
          const reviewsByBooksLabels = reviewsByBooksResponse.data.reviews.map(
            (value) => value[0]
          );
          const reviewsByBooksData = reviewsByBooksResponse.data.reviews.map(
            (value) => value[1]
          );
          setReviewsByBooksLabels(reviewsByBooksLabels);
          setReviewsByBooksData(reviewsByBooksData);
          break;
        case reviewsByBooksResponse.error:
          break;
      }
    }
  }, [reviewsByBooksResponse]);

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
        categories: reviewsByReadersLabels,
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
        data: reviewsByReadersData,
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
        categories: reviewsByBooksLabels,
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
        data: reviewsByBooksData,
      },
    ],
  };

  if (reviewsByReadersResponse.loading || reviewsByBooksResponse.loading) {
    return <div class="Stats-loader">Loading...</div>;
  }
  return (
    <>
      <Row xs={24} sm={24} md={24} lg={24} className="mb-5">
        <div className="content-heading">
          <div>Reviews By Readers</div>
        </div>
        <Chart {...chartData} />
      </Row>
      <Row xs={24} sm={24} md={24} lg={24} className="mb-5">
        <div className="content-heading">
          <div>Reviews per book</div>
        </div>
        <Chart {...genreChartData} />
      </Row>
    </>
  );
};
