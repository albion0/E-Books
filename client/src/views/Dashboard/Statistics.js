import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { counts } from "../../store/actions/actions";
import { toastNotification } from "../../utils/toastNotification";
import { Row, Col, Tabs } from "antd";
import {
  UiChecks,
  BookFill,
  Type,
  CurrencyDollar,
  BagFill,
  StarFill,
  QuestionCircleFill,
  ChatFill,
  PersonBadgeFill,
  PersonLinesFill,
} from "react-bootstrap-icons";
import Datetime from "react-datetime";
import "react-datetime/css/react-datetime.css";
import "../../style/stats.scss";
import { BookReports } from "./Reports/BookReports";
import { PaymentReports } from "./Reports/PaymentReports";

const { TabPane } = Tabs;

const StatisticPage = () => {
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());

  const dispatch = useDispatch();

  const countsResponse = useSelector(({ reports }) => reports.counts);

  useEffect(() => {
    if (startDate || endDate) {
      dispatch(counts({ startDate, endDate }));
    }
  }, [startDate, endDate]);

  const handleStartDateChange = (date) => {
    if (date > endDate) {
      toastNotification("error", "Start date cannot be bigger than end date");
      return;
    }
    setStartDate(date);
  };

  const handleEndDateChange = (date) => {
    if (date < startDate) {
      toastNotification("error", "End date cannot be smaller than start date");
      return;
    }
    setEndDate(date);
  };

  if (countsResponse.loading) {
    return <div class="Stats-loader">Loading...</div>;
  }
  return (
    <>
      <div style={{ width: "100%" }}>
        <div className="content-heading">
          <div>Statistics</div>
        </div>
        <hr
          style={{ width: "100%", borderTop: "1px solid lightgray" }}
          className="mb-4 mt-3"
        />
        <Row className="flex-wrap">
          <Col md={12} lg={12} sm={24} xs={24}>
            <div className="form-group mb form-inline">
              <label
                className="col-form-label mb lead pr-2"
                style={{
                  fontSize: "17.5px",
                  fontFamily: '"Source Sans Pro", sans-serif',
                  color: "#656565",
                  fontWeight: "inherit",
                }}
              >
                Start Date:
              </label>
              <Datetime
                value={startDate}
                onChange={handleStartDateChange}
                inputProps={{ className: "dates form-control ms-3" }}
              />
            </div>
          </Col>
          <Col md={12} lg={12} sm={24} xs={24}>
            <div className="form-group mb form-inline">
              <label
                className="col-form-label mb lead pr-2"
                style={{
                  fontSize: "17.5px",
                  fontFamily: '"Source Sans Pro", sans-serif',
                  color: "#656565",
                  fontWeight: "inherit",
                }}
              >
                End Date:
              </label>
              <Datetime
                value={endDate}
                onChange={handleEndDateChange}
                inputProps={{ className: "dates form-control ms-3" }}
              />
            </div>
          </Col>
        </Row>
        <hr
          style={{ width: "100%", borderTop: "1px solid lightgray" }}
          className="mb-3"
        />
        <Row
          xs={24}
          sm={24}
          md={24}
          lg={24}
          style={{ rowGap: "10px", columnGap: "100px" }}
        >
          <Col xl={11} md={11} sm={24} xs={24} className="pr-3 pb-3">
            <div className="card flex-row align-items-center align-items-stretch border-0">
              <div
                className="col-4 d-flex align-items-center justify-content-center rounded-left"
                style={{ backgroundColor: "#aeaeae", color: "white" }}
              >
                <PersonLinesFill size={"3em"} />
              </div>
              <div
                className="col-8 py-3 rounded-right"
                style={{
                  backgroundColor: "#aeaeae",
                  color: "white",
                  opacity: "0.9",
                }}
              >
                <div className="h2 mt-0">
                  {countsResponse &&
                  countsResponse.success &&
                  countsResponse.data &&
                  countsResponse.data.counts
                    ? countsResponse.data.counts.userCount
                    : null}
                </div>
                <div className="text-uppercase">Readers</div>
              </div>
            </div>
          </Col>
          <Col xl={11} md={11} sm={24} xs={24} className="pr-3 pb-3">
            <div className="card flex-row align-items-center align-items-stretch border-0">
              <div
                className="col-4 d-flex align-items-center justify-content-center rounded-left"
                style={{ backgroundColor: "#aeaeae", color: "white" }}
              >
                <PersonBadgeFill size={"3em"} />
                <em className="fa-3x fas fa-handshake"></em>
              </div>
              <div
                className="col-8 py-3 rounded-right"
                style={{
                  backgroundColor: "#aeaeae",
                  color: "white",
                  opacity: "0.9",
                }}
              >
                <div className="h2 mt-0">
                  {countsResponse &&
                  countsResponse.success &&
                  countsResponse.data &&
                  countsResponse.data.counts
                    ? countsResponse.data.counts.adminCount
                    : null}
                </div>
                <div className="text-uppercase">Admins</div>
              </div>
            </div>
          </Col>
          <Col xl={11} md={11} xs={24} sm={24} className="pr-3 pb-3">
            <div className="card flex-row align-items-center align-items-stretch border-0">
              <div
                className="col-4 d-flex align-items-center justify-content-center rounded-left"
                style={{ backgroundColor: "#aeaeae", color: "white" }}
              >
                <em className="fa-3x fas fa-handshake"></em>
                <BookFill size={"3em"} />
              </div>
              <div
                className="col-8 py-3 rounded-right"
                style={{
                  backgroundColor: "#aeaeae",
                  color: "white",
                  opacity: "0.9",
                }}
              >
                <div className="h2 mt-0">
                  {countsResponse &&
                  countsResponse.success &&
                  countsResponse.data &&
                  countsResponse.data.counts
                    ? countsResponse.data.counts.bookCount
                    : null}
                </div>
                <div className="text-uppercase">Books</div>
              </div>
            </div>
          </Col>
          <Col xl={11} md={11} xs={24} sm={24} className="pr-3 pb-3">
            <div className="card flex-row align-items-center align-items-stretch border-0">
              <div
                className="col-4 d-flex align-items-center justify-content-center rounded-left"
                style={{ backgroundColor: "#aeaeae", color: "white" }}
              >
                <em className="fa-3x fas fa-handshake"></em>
                <UiChecks size={"3em"} />
              </div>
              <div
                className="col-8 py-3 rounded-right"
                style={{
                  backgroundColor: "#aeaeae",
                  color: "white",
                  opacity: "0.9",
                }}
              >
                <div className="h2 mt-0">
                  {countsResponse &&
                  countsResponse.success &&
                  countsResponse.data &&
                  countsResponse.data.counts
                    ? countsResponse.data.counts.authorCount
                    : null}
                </div>
                <div className="text-uppercase">Author</div>
              </div>
            </div>
          </Col>
          <Col xl={11} md={11} xs={24} sm={24} className="pr-3 pb-3">
            <div className="card flex-row align-items-center align-items-stretch border-0">
              <div
                className="col-4 d-flex align-items-center justify-content-center rounded-left"
                style={{ backgroundColor: "#aeaeae", color: "white" }}
              >
                <em className="fa-3x fas fa-handshake"></em>
                <Type size={"3em"} />
              </div>
              <div
                className="col-8 py-3 rounded-right"
                style={{
                  backgroundColor: "#aeaeae",
                  color: "white",
                  opacity: "0.9",
                }}
              >
                <div className="h2 mt-0">
                  {countsResponse &&
                  countsResponse.success &&
                  countsResponse.data &&
                  countsResponse.data.counts
                    ? countsResponse.data.counts.genreCount
                    : null}
                </div>
                <div className="text-uppercase">Genres</div>
              </div>
            </div>
          </Col>
          <Col xl={11} md={11} xs={24} sm={24} className="pr-3 pb-3">
            <div className="card flex-row align-items-center align-items-stretch border-0">
              <div
                className="col-4 d-flex align-items-center justify-content-center rounded-left"
                style={{ backgroundColor: "#aeaeae", color: "white" }}
              >
                <em className="fa-3x fas fa-handshake"></em>
                <CurrencyDollar size={"3em"} />
              </div>
              <div
                className="col-8 py-3 rounded-right"
                style={{
                  backgroundColor: "#aeaeae",
                  color: "white",
                  opacity: "0.9",
                }}
              >
                <div className="h2 mt-0">
                  {countsResponse &&
                  countsResponse.success &&
                  countsResponse.data &&
                  countsResponse.data.counts
                    ? countsResponse.data.counts.paymentCount
                    : null}
                </div>
                <div className="text-uppercase">Payments</div>
              </div>
            </div>
          </Col>
          <Col xl={11} md={11} xs={24} sm={24} className="pr-3 pb-3">
            <div className="card flex-row align-items-center align-items-stretch border-0">
              <div
                className="col-4 d-flex align-items-center justify-content-center rounded-left"
                style={{ backgroundColor: "#aeaeae", color: "white" }}
              >
                <em className="fa-3x fas fa-handshake"></em>
                <BagFill size={"3em"} />
              </div>
              <div
                className="col-8 py-3 rounded-right"
                style={{
                  backgroundColor: "#aeaeae",
                  color: "white",
                  opacity: "0.9",
                }}
              >
                <div className="h2 mt-0">
                  {countsResponse &&
                  countsResponse.success &&
                  countsResponse.data &&
                  countsResponse.data.counts
                    ? countsResponse.data.counts.bookPurchaseCount
                    : null}
                </div>
                <div className="text-uppercase">Book Purchases</div>
              </div>
            </div>
          </Col>
          <Col xl={11} md={11} xs={24} sm={24} className="pr-3 pb-3">
            <div className="card flex-row align-items-center align-items-stretch border-0">
              <div
                className="col-4 d-flex align-items-center justify-content-center rounded-left"
                style={{ backgroundColor: "#aeaeae", color: "white" }}
              >
                <em className="fa-3x fas fa-handshake"></em>
                <StarFill size={"3em"} />
              </div>
              <div
                className="col-8 py-3 rounded-right"
                style={{
                  backgroundColor: "#aeaeae",
                  color: "white",
                  opacity: "0.9",
                }}
              >
                <div className="h2 mt-0">
                  {countsResponse &&
                  countsResponse.success &&
                  countsResponse.data &&
                  countsResponse.data.counts
                    ? countsResponse.data.counts.reviewCount
                    : null}
                </div>
                <div className="text-uppercase">Reviews</div>
              </div>
            </div>
          </Col>
          <Col xl={11} md={11} xs={24} sm={24} className="pr-3 pb-3">
            <div className="card flex-row align-items-center align-items-stretch border-0">
              <div
                className="col-4 d-flex align-items-center justify-content-center rounded-left"
                style={{ backgroundColor: "#aeaeae", color: "white" }}
              >
                <em className="fa-3x fas fa-handshake"></em>
                <QuestionCircleFill size={"3em"} />
              </div>
              <div
                className="col-8 py-3 rounded-right"
                style={{
                  backgroundColor: "#aeaeae",
                  color: "white",
                  opacity: "0.9",
                }}
              >
                <div className="h2 mt-0">
                  {countsResponse &&
                  countsResponse.success &&
                  countsResponse.data &&
                  countsResponse.data.counts
                    ? countsResponse.data.counts.forumTopicCount
                    : null}
                </div>
                <div className="text-uppercase">Forum Topics</div>
              </div>
            </div>
          </Col>
          <Col xl={11} md={11} xs={24} sm={24} className="pr-3 pb-3">
            <div className="card flex-row align-items-center align-items-stretch border-0">
              <div
                className="col-4 d-flex align-items-center justify-content-center rounded-left"
                style={{ backgroundColor: "#aeaeae", color: "white" }}
              >
                <em className="fa-3x fas fa-handshake"></em>
                <ChatFill size={"3em"} />
              </div>
              <div
                className="col-8 py-3 rounded-right"
                style={{
                  backgroundColor: "#aeaeae",
                  color: "white",
                  opacity: "0.9",
                }}
              >
                <div className="h2 mt-0">
                  {countsResponse &&
                  countsResponse.success &&
                  countsResponse.data &&
                  countsResponse.data.counts
                    ? countsResponse.data.counts.forumCommentCount
                    : null}
                </div>
                <div className="text-uppercase">Forum Comments</div>
              </div>
            </div>
          </Col>
        </Row>
        <Row style={{ margin: "0px !important" }}>
          <div role="tabpanel" className="w-100">
            <Tabs type="card" destroyInactiveTabPane>
              <TabPane tab="Books" key="books">
                <BookReports startDate={startDate} endDate={endDate} />
              </TabPane>
              <TabPane tab="Payments" key="payments">
                <PaymentReports startDate={startDate} endDate={endDate} />
              </TabPane>
            </Tabs>
          </div>
        </Row>
      </div>
    </>
  );
};

export default StatisticPage;
