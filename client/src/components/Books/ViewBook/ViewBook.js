import { useState } from "react";
import { TablePagination } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { Rate } from "antd";

import Ratings from "./Ratings/Ratings";
import Reviews from "./Reviews/Reviews";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

import classes from "./ViewBook.module.css";
import bookImg from "../../../assets/images/book.png";
import ConfirmModal from "../ConfirmModal/ConfirmModal";

import { toastNotification } from "../../../utils/toastNotification";
// import { useHistory } from "react-router";
import { useEffect } from "react";
import { createBookReview, getOneBook } from "../../../store/actions/books";
import { NavLink, useHistory } from "react-router-dom";

const ViewBook = (props) => {
  const token = localStorage.getItem("eBook-token");

  const [isLoading, setIsLoading] = useState(false);
  const [book, setBook] = useState({});
  const [genres, setGenres] = useState("Loading...");
  const [totalItems, setTotalItems] = useState(100);
  const [showFeedback, setShowFeedback] = useState(false);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [rating, setRating] = useState(0);

  const dispatch = useDispatch();
  const { id } = props.match.params;

  const history = useHistory();

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
    if (!!title && !!description) {
      dispatch(
        createBookReview(
          { userId: getUser.data.user._id, bookId: id, title, description, rating: rating },
          {
            toastNotification,
            history,
            pathname: "/book/id",
            onSuccessMessage: "Review added successfully!",
            onFailMessage: "Failed to add review!",
          }
          )
      );
      
      closeFeedbackMenu();
    } else {
      toastNotification("error", "Form can't be empty.");
    }
  };

  const titleInputHandler = (e) => {
    setTitle(e.target.value);
  }

  const rateHandler = (e) => {
    setRating(e);
  }

  const closeFeedbackMenu = () => {
    setTitle("");
    setDescription("");
    setRating(0);
    setShowFeedback(false);
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
              <Rate allowHalf allowClear defaultValue={rating} value={rating} onChange={rateHandler} />
              <p className={classes.text}>{rating} out of 5</p>
            </div>

            <div className={classes.title}>
              <p className={classes.categoryTxt}>Title</p>
              <input type="text" placeholder="Title" value={title} className={classes.input} onChange={titleInputHandler} />
            </div>

            <div className={classes.content}>
            <p className={classes.categoryTxt}>Description</p>
              <ReactQuill
                theme="snow"
                value={description}
                placeholder="Description"
                onChange={setDescription}
                style={{ height: "150px" }}
              />
            </div>
          </div>
          <div className={classes.buttons}>
            <button className={classes.submitBtn} onClick={submitHandler}>
              Submit
            </button>
            <button className={classes.clearBtn} onClick={closeFeedbackMenu}>
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
          <Reviews bookId={id} />
        </div>
      </section>
    </div>
  );
};

export default ViewBook;
