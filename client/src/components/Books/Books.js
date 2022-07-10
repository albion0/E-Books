import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { TablePagination } from "@mui/material";
import { Spin, Row, Col } from "antd";
import { LoadingOutlined } from "@ant-design/icons";

import Footer from "../Footer/Footer";
import Book from "./Book/Book";
import classes from "./Books.module.css";
import bookImg from "../../assets/images/book.png";
import Filters from "./Filters/Filters";
import { getAllBooks } from "../../store/actions/books";

const defaultPage = 0;
const defaultLimit = 10;

const Books = () => {
  // const [rowsPerPage, setRowsPerPage] = useState(10);
  const [currentPage, setCurrentPage] = useState(defaultPage);
  const [currentLimit, setCurrentLimit] = useState(defaultLimit);
  const [currentBooks, setCurrentBooks] = useState([]);
  const [totalItems, setTotalItems] = useState(100);
  const [isLoading, setIsLoading] = useState(false);

  const dispatch = useDispatch();
  const getAllBooksResponse = useSelector(({ books }) => books.getAll);

  useEffect(() => {
    dispatch(
      getAllBooks({
        page: currentPage + 1,
        limit: currentLimit,
        pagination: true,
      })
    );
  }, []);

  useEffect(() => {
    dispatch(
      getAllBooks({
        page: currentPage + 1,
        limit: currentLimit,
        pagination: true,
      })
    );
  }, [currentLimit, currentPage]);

  useEffect(() => {
    if (getAllBooksResponse && getAllBooksResponse.loading) {
      setIsLoading(true);
    } else if (getAllBooksResponse && getAllBooksResponse.success) {
      setIsLoading(false);

      const { docs, totalDocs } = getAllBooksResponse.data.books;

      setCurrentBooks(docs);
      setTotalItems(totalDocs);
    } else if (getAllBooksResponse && getAllBooksResponse.error) {
      setIsLoading(false);
    }
  }, [getAllBooksResponse]);

  const handleChangePage = (event, newPage) => {
    setCurrentPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setCurrentLimit(parseInt(event.target.value, 10));
    setCurrentPage(0);
  };

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

        {/* <div className={classes.books}> */}
        <Row xs={24} sm={24} md={24} lg={24}>
          {currentBooks.map((item) => (
            <Col xs={24} sm={12} md={5} lg={5} className="m-4">
              <Book
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

        {/* </div> */}

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

export default Books;