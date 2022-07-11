import React, { useEffect, useState } from "react";
import {
  forumTopicsByReaders,
  forumCommentsByReaders,
} from "../../../store/actions/actions";
import MUIDataTable from "mui-datatables";
import { useSelector, useDispatch } from "react-redux";
import ApexCharts from "apexcharts";
import Chart from "react-apexcharts";
import { Row } from "antd";
import "../../../style/stats.scss";

export const ForumReports = ({ startDate, endDate }) => {
  const [forumTopicsByReadersLabels, setForumTopicsByReadersLabels] = useState(
    []
  );
  const [forumTopicsByReadersData, setForumTopicsByReadersData] = useState([]);
  const [forumCommentsByReadersLabels, setForumCommentsByReadersLabels] =
    useState([]);
  const [forumCommentsByReadersData, setForumCommentsByReadersData] = useState(
    []
  );
  const forumTopicsByReadersResponse = useSelector(
    ({ reports }) => reports.forumTopicsByReaders
  );
  const forumCommentsByReadersResponse = useSelector(
    ({ reports }) => reports.forumCommentsByReaders
  );

  const dispatch = useDispatch();

  useEffect(() => {
    if (startDate || endDate) {
      dispatch(
        forumTopicsByReaders({
          startDate: startDate ? startDate : undefined,
          endDate: endDate ? endDate : undefined,
        })
      );
      dispatch(
        forumCommentsByReaders({
          startDate: startDate ? startDate : undefined,
          endDate: endDate ? endDate : undefined,
        })
      );
    }
  }, []);

  useEffect(() => {
    if (forumTopicsByReadersResponse) {
      switch (true) {
        case forumTopicsByReadersResponse.loading:
          break;
        case forumTopicsByReadersResponse.success:
          const forumTopicsByReadersLabels =
            forumTopicsByReadersResponse.data.forumTopics.map(
              (value) => value[0]
            );
          const forumTopicsByReadersData =
            forumTopicsByReadersResponse.data.forumTopics.map(
              (value) => value[1]
            );
          setForumTopicsByReadersLabels(forumTopicsByReadersLabels);
          setForumTopicsByReadersData(forumTopicsByReadersData);
          break;
        case forumTopicsByReadersResponse.error:
          break;
      }
    }
  }, [forumTopicsByReadersResponse]);

  useEffect(() => {
    if (forumCommentsByReadersResponse) {
      switch (true) {
        case forumCommentsByReadersResponse.loading:
          break;
        case forumCommentsByReadersResponse.success:
          const forumCommentsByReadersLabels =
            forumCommentsByReadersResponse.data.forumComments.map(
              (value) => value[0]
            );
          const forumCommentsByReadersData =
            forumCommentsByReadersResponse.data.forumComments.map(
              (value) => value[1]
            );
          setForumCommentsByReadersLabels(forumCommentsByReadersLabels);
          setForumCommentsByReadersData(forumCommentsByReadersData);
          break;
        case forumCommentsByReadersResponse.error:
          break;
      }
    }
  }, [forumCommentsByReadersResponse]);

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
        categories: forumTopicsByReadersLabels,
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
        data: forumTopicsByReadersData,
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
        categories: forumCommentsByReadersLabels,
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
        data: forumCommentsByReadersData,
      },
    ],
  };

  if (
    forumTopicsByReadersResponse.loading ||
    forumCommentsByReadersResponse.loading
  ) {
    return <div class="Stats-loader">Loading...</div>;
  }
  return (
    <>
      <Row xs={24} sm={24} md={24} lg={24} className="mb-5">
        <div className="content-heading">
          <div>Forum Topics By Readers</div>
        </div>
        <Chart {...chartData} />
      </Row>
      <Row xs={24} sm={24} md={24} lg={24} className="mb-5">
        <div className="content-heading">
          <div>Forum Comments By Readers</div>
        </div>
        <Chart {...genreChartData} />
      </Row>
    </>
  );
};
