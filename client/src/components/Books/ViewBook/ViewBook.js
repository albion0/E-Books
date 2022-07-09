import { useState } from "react";
import { TablePagination } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import moment from "moment";

import Ratings from "./Ratings/Ratings";
import Reviews from "./Reviews/Reviews";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

import classes from "./ViewBook.module.css";
import bookImg from "../../../assets/images/book.png";
import ConfirmModal from "../ConfirmModal/ConfirmModal";

import { toastNotification } from "../../../utils/toastNotification";
import { useHistory } from "react-router";
import { useEffect } from "react";
import { getOneBook } from "../../../store/actions/books";
import { NavLink } from "react-router-dom";

const ViewBook = (props) => {
  const token = localStorage.getItem("eBook-token");
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [book, setBook] = useState({});
  const [genres, setGenres] = useState("Loading...");
  const [totalItems, setTotalItems] = useState(100);
  const [showFeedback, setShowFeedback] = useState(false);
  const [value, setValue] = useState("");

  const dispatch = useDispatch();
  const { id } = props.match.params;

  const getBookResponse = useSelector(({ books }) => books.getOne);
  const getUser = useSelector(({ auth }) => auth.getOne);
  const isBookBought =
    getUser.data?.user.books.findIndex((book) => book._id === id) >= 0;

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

  const submitHandler = () => {
    if (!value) {
      toastNotification("error", "Form can't be empty.");
    }
  };

  const cancelHandler = () => {
    setValue("");
    setShowFeedback(false);
  };

  const handleChangePage = (event, newPage) => {
    setCurrentPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setCurrentPage(0);
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
            <p className={classes.date}>Date: {book.createdAt}</p>
            <p className={classes.reviews}>Total Reviews: 10</p>
            {!token ? (
              <button className={classes.addFeedback}>
                <NavLink to="/login" style={{ color: "black" }}>
                  Login
                </NavLink>
              </button>
            ) : getUser?.data?.user?.books?.some((e) => e._id === id) ? (
              <button className={classes.btn}>
                <NavLink
                  to={`/books/my-book/${book._id}`}
                  style={{ color: "white" }}
                >
                  Read
                </NavLink>
              </button>
            ) : (
              <ConfirmModal price={book.credits} bookId={id} />
            )}
          </div>
        </div>
        <div className={classes.info}>
          <div
            dangerouslySetInnerHTML={{
              __html:
                book?.content?.length > 1000
                  ? book.content.slice(0, 1001) + "..."
                  : book.content,
            }}
          ></div>

          {/* const newValue = value.length > 15 ? `${value.slice(0, 16)}...` : value; */}
        </div>
      </main>

      <section>
        <div
          className={classes.addReply}
          style={{ display: showFeedback ? "block" : "none" }}
        >
          <div className={classes.addReply}>
            <div className={classes.rating}>
              <p className={classes.ratingText}>Choose your Rating:</p>
              <select name="" id="" className={classes.options}>
                <option value="">1</option>
                <option value="">2</option>
                <option value="">3</option>
                <option value="">4</option>
                <option value="">5</option>
              </select>
            </div>

            <ReactQuill
              theme="snow"
              value={value}
              onChange={setValue}
              style={{ height: "150px" }}
            />
          </div>
          <div className={classes.buttons}>
            <button className={classes.submitBtn} onClick={submitHandler}>
              Submit
            </button>
            <button className={classes.clearBtn} onClick={cancelHandler}>
              Cancel
            </button>
          </div>
        </div>
        {!showFeedback && token && (
          <button
            className={classes.addFeedback}
            onClick={() => setShowFeedback(true)}
          >
            Add Feedback
          </button>
        )}

        <div className={classes.constumer}>
          <Ratings />
          <Reviews />
        </div>
      </section>

      <div className={classes.pagination}>
        <TablePagination
          component="div"
          count={100}
          page={currentPage}
          onPageChange={handleChangePage}
          rowsPerPage={rowsPerPage}
          onRowsPerPageChange={handleChangeRowsPerPage}
          style={{ marginBottom: "20px" }}
          className={classes.table}
        />
      </div>
    </div>
  );
};

export default ViewBook;
