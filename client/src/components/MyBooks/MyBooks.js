import { useState, useEffect } from "react";
import { TablePagination } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { Spin, Row, Col } from "antd";
import { LoadingOutlined } from "@ant-design/icons";

import MyBook from "./MyBook/MyBook";
import Filters from "../Books/Filters/Filters";
import Footer from "../Footer/Footer";
import classes from "./MyBooks.module.css";
import bookImg from "../../assets/images/book.png";
import { Redirect, useHistory } from "react-router-dom";
import { getUserBooks } from "../../store/actions/books";

const defaultPage = 0;
const defaultLimit = 10;

const MyBooks = () => {
  const token = localStorage.getItem("eBook-token");
  const [isLoading, setIsLoading] = useState(false);

  const dispatch = useDispatch();
  const userResponse = useSelector(({ auth }) => auth.getOne);

  if (!token) return <Redirect to="/" />;
  if (isLoading)
    return (
      <div
        className="d-flex justify-content-center"
        style={{ marginTop: "300px" }}
      >
        <Spin indicator={<LoadingOutlined style={{ fontSize: 100 }} spin />} />
      </div>
    );

  return (
    <>
      <div className={classes.wrapper}>
        <Filters />

        {/* <div className={classes.books}>
          {userResponse?.data?.user?.books?.map((item) => (
            <MyBook
              key={item._id}
              id={item._id}
              img={item.bookPhoto}
              title={item.title}
              desc={item.content}
              price={item.credits}
              date={item.createdAt}
            />
          ))}
        </div> */}

        <Row xs={24} sm={24} md={24} lg={24}>
          {userResponse?.data?.user?.books?.map((item) => (
            <Col xs={24} sm={12} md={5} lg={5} className="m-4">
              <MyBook
                key={item._id}
                id={item._id}
                img={item.bookPhoto}
                title={item.title}
                desc={item.content}
                price={item.credits}
                date={item.createdAt}
              />
            </Col>
          ))}
        </Row>
      </div>
      <Footer />
    </>
  );
};

export default MyBooks;
