import { useState, useEffect } from "react";
import { TablePagination } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { Spin } from "antd";
import { LoadingOutlined } from "@ant-design/icons";

import MyBook from "./MyBook/MyBook";
import Filters from "../Books/Filters/Filters";
import Footer from "../Footer/Footer";
import classes from "./MyBooks.module.css";
import bookImg from "../../assets/images/book.png";
import { Redirect, useHistory } from "react-router-dom";
import { getUserBooks } from "../../store/actions/books";

// const booksData = [];

// for (let i = 1; i <= 10; i++) {
//   booksData.push({
//     id: "key" + i,
//     img: bookImg,
//     title: "Book " + i,
//     desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
//     price: 20,
//     date: "4/15/2022",
//   });
// }

const defaultPage = 0;
const defaultLimit = 10;

const MyBooks = () => {
  const token = localStorage.getItem("eBook-token");
  const [currentPage, setCurrentPage] = useState(defaultPage);
  const [currentLimit, setCurrentLimit] = useState(defaultLimit);
  const [currentBooks, setCurrentBooks] = useState([]);
  const [totalItems, setTotalItems] = useState(100);
  const [isLoading, setIsLoading] = useState(false);

  const dispatch = useDispatch();
  const userResponse = useSelector(({ auth }) => auth.getOne);
  const booksBought = useSelector(({ books }) => books.getUserBooks);

  useEffect(() => {
    if(userResponse.success) {
      dispatch(getUserBooks({ page: currentPage + 1, limit: currentLimit, userId: userResponse.data.user._id }));
    }
  }, [userResponse.success]);

  useEffect(() => {
    if(booksBought.success) {
      setCurrentBooks(booksBought.data.books);
      setTotalItems(booksBought.data.totalItems);
    }
  }, [booksBought]);

  useEffect(() => {
    console.log(currentLimit, currentPage)
    dispatch(getUserBooks({ page: currentPage + 1, limit: currentLimit, userId: userResponse.data?.user._id }));
  }, [currentLimit, currentPage]);

  useEffect(() => {
    if (booksBought && booksBought.loading) {
      setIsLoading(true);
    } else if (booksBought && booksBought.success) {
      setIsLoading(false);
    } else if (booksBought && booksBought.error) {
      setIsLoading(false);
    }
  }, [booksBought]);

  const handleChangePage = (event, newPage) => {
    setCurrentPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setCurrentLimit(parseInt(event.target.value, 10));
    setCurrentPage(0);
  };

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

        <div className={classes.books}>
          {currentBooks.map((item) => (
            <MyBook
              key={item._id}
              img={item.bookPhoto}
              title={item.title}
              desc={item.content}
              price={item.credits}
              date={item.createdAt}
            />
          ))}
        </div>

        <div className={classes.pagination}>
          <TablePagination
            component="div"
            count={totalItems}
            page={currentPage}
            onPageChange={handleChangePage}
            rowsPerPage={currentLimit}
            onRowsPerPageChange={handleChangeRowsPerPage}
            style={{ marginBottom: "20px" }}
            className={classes.table}
          />
        </div>
      </div>
      <Footer />
    </>
  );
};

export default MyBooks;
