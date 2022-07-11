import React, { useEffect, useState } from "react";
import { booksByAuthors, booksByGenres } from "../../../store/actions/actions";
import MUIDataTable from "mui-datatables";
import { useSelector, useDispatch } from "react-redux";
import ApexCharts from "apexcharts";
import Chart from "react-apexcharts";
import { Row } from "antd";
import "../../../style/stats.scss";

export const BookReports = ({ startDate, endDate }) => {
  const [booksByAuthorsLabels, setBooksByAuthorsLabels] = useState([]);
  const [booksByAuthorsData, setBooksByAuthorsData] = useState([]);
  const [booksByGenresLabels, setBooksByGenresLabels] = useState([]);
  const [booksByGenresData, setBooksByGenresData] = useState([]);
  const booksByAuthorsResponse = useSelector(
    ({ reports }) => reports.booksByAuthors
  );
  const booksByGenresResponse = useSelector(
    ({ reports }) => reports.booksByGenres
  );

  const dispatch = useDispatch();

  useEffect(() => {
    if (startDate || endDate) {
      dispatch(
        booksByAuthors({
          startDate: startDate ? startDate : undefined,
          endDate: endDate ? endDate : undefined,
        })
      );
      dispatch(
        booksByGenres({
          startDate: startDate ? startDate : undefined,
          endDate: endDate ? endDate : undefined,
        })
      );
    }
  }, []);

  useEffect(() => {
    if (booksByAuthorsResponse) {
      switch (true) {
        case booksByAuthorsResponse.loading:
          break;
        case booksByAuthorsResponse.success:
          const booksByAuthorsLabels = booksByAuthorsResponse.data.books.map(
            (value) => value[0]
          );
          const booksByAuthorsData = booksByAuthorsResponse.data.books.map(
            (value) => value[1]
          );
          setBooksByAuthorsLabels(booksByAuthorsLabels);
          setBooksByAuthorsData(booksByAuthorsData);
          break;
        case booksByAuthorsResponse.error:
          break;
      }
    }
  }, [booksByAuthorsResponse]);

  useEffect(() => {
    if (booksByGenresResponse) {
      switch (true) {
        case booksByGenresResponse.loading:
          break;
        case booksByGenresResponse.success:
          const booksByGenresLabels = booksByGenresResponse.data.books.map(
            (value) => value[0]
          );
          const booksByGenresData = booksByGenresResponse.data.books.map(
            (value) => value[1]
          );
          setBooksByGenresLabels(booksByGenresLabels);
          setBooksByGenresData(booksByGenresData);
          break;
        case booksByGenresResponse.error:
          break;
      }
    }
  }, [booksByGenresResponse]);

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
        categories: booksByAuthorsLabels,
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
        data: booksByAuthorsData,
      },
    ],
  };

  const genreChartData = {
    height: 328,
    type: "donut",
    options: {
      chart: {
        id: "revenue-chart",
      },
      dataLabels: {
        enabled: false,
      },
      labels: booksByGenresLabels,
      legend: {
        show: true,
        position: "bottom",
        fontFamily: "inherit",
        labels: {
          colors: "inherit",
        },
        itemMargin: {
          horizontal: 10,
          vertical: 10,
        },
      },
    },
    series: booksByGenresData,
  };

  // const genreChartData = {
  //   height: 480,
  //   type: "bar",
  //   options: {
  //     chart: {
  //       id: "bar-chart",
  //       stacked: true,
  //       toolbar: {
  //         show: true,
  //       },
  //       zoom: {
  //         enabled: true,
  //       },
  //     },
  //     responsive: [
  //       {
  //         breakpoint: 480,
  //         options: {
  //           legend: {
  //             position: "bottom",
  //             offsetX: -10,
  //             offsetY: 0,
  //           },
  //         },
  //       },
  //     ],
  //     plotOptions: {
  //       bar: {
  //         horizontal: false,
  //         columnWidth: "50%",
  //       },
  //     },
  //     xaxis: {
  //       type: "category",
  //       categories: booksByGenresLabels,
  //     },
  //     legend: {
  //       show: true,
  //       fontSize: "14px",
  //       fontFamily: `'Roboto', sans-serif`,
  //       position: "bottom",
  //       offsetX: 20,
  //       labels: {
  //         useSeriesColors: false,
  //       },
  //       markers: {
  //         width: 16,
  //         height: 16,
  //         radius: 5,
  //       },
  //       itemMargin: {
  //         horizontal: 15,
  //         vertical: 8,
  //       },
  //     },
  //     fill: {
  //       type: "solid",
  //     },
  //     dataLabels: {
  //       enabled: false,
  //     },
  //     grid: {
  //       show: true,
  //     },
  //   },
  //   series: [
  //     {
  //       name: "Books",
  //       data: booksByGenresData,
  //     },
  //   ],
  // };

  if (booksByAuthorsResponse.loading || booksByGenresResponse.loading) {
    return <div class="Stats-loader">Loading...</div>;
  }
  return (
    <>
      <Row xs={24} sm={24} md={24} lg={24} className="mb-5">
        <div className="content-heading">
          <div>Books By Authors</div>
        </div>
        <Chart {...chartData} />
      </Row>
      <Row xs={24} sm={24} md={24} lg={24} className="mb-5">
        <div className="content-heading">
          <div>Books By Genres</div>
        </div>
        <Chart {...genreChartData} />
      </Row>
    </>
  );
};
