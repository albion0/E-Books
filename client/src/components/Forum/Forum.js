import { useEffect, useState } from "react";
import { TablePagination } from "@mui/material";
import { NavLink } from "react-router-dom";
import Footer from "../Footer/Footer";
import Filters from "./Filters/Filters";

import classes from "./Forum.module.css";
import personImg from "../../assets/images/person.jpg";
import { useDispatch, useSelector } from "react-redux";
import { getAllForumTopics } from "../../store/actions/actions";
import { Spin } from "antd";
import { LoadingOutlined } from "@ant-design/icons";
import moment from "moment";
import { Redirect, useHistory } from "react-router-dom";

const Forum = () => {
  const token = localStorage.getItem("eBook-token");
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalItems, setTotalItems] = useState(100);
  const [localForumTopics, setLocalForumTopics] = useState([]);
  const [loading, setLoading] = useState(true);

  const forumTopicsResponse = useSelector(
    ({ forumTopics }) => forumTopics.getAll
  );

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllForumTopics({}));
  }, []);

  useEffect(() => {
    if (forumTopicsResponse) {
      switch (true) {
        case forumTopicsResponse.loading:
          setLoading(true);
          break;
        case forumTopicsResponse.success:
          const { forumTopics } = forumTopicsResponse.data;
          setLocalForumTopics(forumTopics);
          setLoading(false);
          break;
        case forumTopicsResponse.error:
          setLoading(false);
          break;
        default:
          break;
      }
    }
  }, [forumTopicsResponse]);

  const handleChangePage = (event, newPage) => {
    setCurrentPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setCurrentPage(0);
  };

  if (!token) return <Redirect to="/" />;
  return (
    <>
      <div className={classes.wrapper}>
        {/* <Filters /> */}
        <NavLink to="/forum/add-topic" className={classes.addBtn}>
          Add Topic
        </NavLink>
        {loading ? (
          <div
            className="d-flex justify-content-center"
            style={{ marginTop: "100px" }}
          >
            <Spin
              indicator={<LoadingOutlined style={{ fontSize: 100 }} spin />}
            />
          </div>
        ) : (
          <>
            <table className={classes.table}>
              <thead>
                <tr>
                  <td>Topic</td>
                  <td>Date</td>
                </tr>
              </thead>
              <tbody>
                {localForumTopics && localForumTopics.length !== 0 ? (
                  localForumTopics.map((forumTopic) => (
                    <tr>
                      <td className={classes.user}>
                        <img
                          src={personImg}
                          alt="Person img"
                          className={classes.img}
                        />
                        <div>
                          <NavLink
                            to={`/forum/${forumTopic.id}`}
                            className={classes.title}
                          >
                            {forumTopic.topic}
                          </NavLink>
                          {/* <p className={classes.title}>Lorem ipsum dolor sit</p> */}
                          <p className={classes.username}>
                            {forumTopic.user?.username
                              ? forumTopic.user.username
                              : "NA"}
                          </p>
                        </div>
                      </td>
                      <td>
                        <p className={classes.text}>
                          {moment(forumTopic.createdAt).format(
                            "dddd, MMMM Do YYYY, h:mm:ss a"
                          )}
                        </p>
                        {/* <p className={classes.text}>Friday, 15 April, 2022</p> */}
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td>
                      <p className={classes.text}>
                        No Forum Topics at this time! Check back later
                      </p>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>

            <div
              className={classes.pagination}
              style={{ marginTop: "50px" }}
            ></div>
          </>
        )}
      </div>

      <Footer />
    </>
  );
};

export default Forum;
