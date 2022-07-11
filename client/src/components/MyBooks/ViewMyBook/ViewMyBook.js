import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import moment from "moment";

import classes from "./ViewMyBook.module.css";
import bookImg from "../../../assets/images/book.png";

import { toastNotification } from "../../../utils/toastNotification";
import { useHistory } from "react-router";
import { useEffect } from "react";
import { getOneBook } from "../../../store/actions/books";
import ApiClient from "../../../services/ApiClient";
import { Spin } from "antd";
import { LoadingOutlined } from "@ant-design/icons";

const ViewMyBook = (props) => {
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [book, setBook] = useState({});
  const [genres, setGenres] = useState("Loading...");
  const [totalItems, setTotalItems] = useState(100);
  const [showFeedback, setShowFeedback] = useState(false);
  const [value, setValue] = useState("");
  const [loadingButton, setLoadingButton] = useState(false);

  const dispatch = useDispatch();
  const { id } = props.match.params;

  const getBookResponse = useSelector(({ books }) => books.getOne);
  const getUser = useSelector(({ auth }) => auth.getOne);

  useEffect(() => {
    dispatch(getOneBook({ bookId: id }));
  }, []);

  useEffect(() => {
    if (getBookResponse && getBookResponse.loading) {
      setIsLoading(true);
    } else if (getBookResponse && getBookResponse.success) {
      setIsLoading(false);

      const data = getBookResponse.data.book;

      setBook(data);
    } else if (getBookResponse && getBookResponse.error) {
      setIsLoading(false);
    }
  }, [getBookResponse]);

  const onDocumentDownload = (event, bookId, title) => {
    setLoadingButton(true);
    event.preventDefault();
    ApiClient.get(`/books/${bookId}/generate`, {
      responseType: "blob",
    })
      .then((res) => {
        setLoadingButton(false);
        if (res.data) {
          const myURL = window.URL || window.webkitURL;
          const pdfURL = myURL.createObjectURL(res.data);

          const fileName = `Book_${title}.pdf`;

          const element = window.document.createElement("a");
          element.setAttribute("href", pdfURL);
          element.setAttribute("download", fileName);
          element.click();
        } else {
          toastNotification("error", "Server problems!");
        }
      })
      .catch((err) => {
        setLoadingButton(false);
        if (err.response && err.response.data.message) {
          toastNotification("error", "Server problems!");
        } else {
          toastNotification("error", "Server problems!");
        }
      });
  };

  return (
    <div className={classes.wrapper}>
      <main className={classes.main}>
        <div className={classes.book}>
          <img src={book.bookPhoto} alt="Book Img" className={classes.img} />
          <div className={classes.details}>
            <h3 className={classes.title}>{book.title}</h3>
            <p className={classes.author}>
              Author:{" "}
              {book.authors?.length > 0
                ? book.authors.map((e) => e.name + ", ")
                : "Loading..."}
            </p>
            <p className={classes.genree}>
              Genres:{" "}
              {book.genres?.length > 0
                ? book.genres.map((e) => e.name + ", ")
                : "Loading..."}
            </p>
            <p className={classes.price}>Price: {book.credits} Credits</p>
            <p className={classes.date}>
              Date: {moment(book.createdAt).format("DD/MM/YYYY")}
            </p>
            <p className={classes.reviews}>Total Reviews: 10</p>

            {loadingButton ? (
              <button
                className={classes.btn}
                style={{ width: "100%", backgroundColor: "lightgray" }}
                disabled
              >
                <div style={{ display: "flex", justifyContent: "center" }}>
                  <Spin
                    indicator={
                      <LoadingOutlined style={{ fontSize: 20 }} spin />
                    }
                  />
                </div>
              </button>
            ) : (
              <button
                className={classes.btn}
                style={{ width: "100%" }}
                onClick={(e) => onDocumentDownload(e, book._id, book.title)}
              >
                Download Book
              </button>
            )}
          </div>
        </div>
        <div className={classes.info}>
          <div dangerouslySetInnerHTML={{ __html: book.content }}></div>
        </div>
      </main>
    </div>
  );
};

export default ViewMyBook;
