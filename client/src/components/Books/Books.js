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
import {
  getAllBooks,
  getAllAuthors,
  getAllGenres,
} from "../../store/actions/actions";

const defaultPage = 0;
const defaultLimit = 10;

const Books = () => {
  // const [rowsPerPage, setRowsPerPage] = useState(10);
  const [currentPage, setCurrentPage] = useState(defaultPage);
  const [currentLimit, setCurrentLimit] = useState(defaultLimit);
  const [currentBooks, setCurrentBooks] = useState([]);
  const [totalItems, setTotalItems] = useState(100);
  const [isLoading, setIsLoading] = useState(false);
  const [bookName, setBookName] = useState("");
  const [bookCredits, setBookCredits] = useState("");
  const [selectedAuthor, setSelectedAuthor] = useState("choose");
  const [selectedGenre, setSelectedGenre] = useState("choose");
  const [authorChips, setAuthorChips] = useState([]);
  const [genreChips, setGenreChips] = useState([]);

  const dispatch = useDispatch();
  const getAllBooksResponse = useSelector(({ books }) => books.getAll);
  const authorsResponse = useSelector(({ authors }) => authors.getAll);
  const genresResponse = useSelector(({ genres }) => genres.getAll);

  useEffect(() => {
    dispatch(getAllAuthors({ pagination: false }));
    dispatch(getAllGenres({ pagination: false }));
  }, []);

  useEffect(() => {
    dispatch(
      getAllBooks({
        page: currentPage + 1,
        limit: currentLimit,
        pagination: true,
        bookName: bookName || null,
        bookCredits: bookCredits || null,
        authors: authorChips?.length
          ? authorChips.map((author) => author._id)
          : null,
        genres: genreChips?.length
          ? genreChips.map((genre) => genre._id)
          : null,
      })
    );
  }, [
    currentLimit,
    currentPage,
    bookName,
    bookCredits,
    authorChips,
    genreChips,
  ]);

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

  useEffect(() => {
    if (authorsResponse && genresResponse) {
      switch (true) {
        case authorsResponse.loading || genresResponse.loading:
          setIsLoading(true);
          break;
        case authorsResponse.success && genresResponse.success:
          setIsLoading(false);
          break;
        case authorsResponse.error || genresResponse.error:
          setIsLoading(false);
          break;
        default:
          break;
      }
    }
  }, [authorsResponse, genresResponse]);

  const handleChangePage = (event, newPage) => {
    setCurrentPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setCurrentLimit(parseInt(event.target.value, 10));
    setCurrentPage(0);
  };

  const onAuthorChange = (author, type) => {
    switch (type) {
      case "add":
        const exists = authorChips.find((chip) => chip._id === author._id);
        if (exists) return;

        const addedArray = [...authorChips, author];
        setAuthorChips(addedArray);
        setSelectedAuthor(author._id);
        break;
      case "delete":
        const filteredArray = authorChips.filter(
          (chip) => chip._id !== author._id
        );
        setAuthorChips(filteredArray);
        setSelectedAuthor("choose");
        break;
      default:
        break;
    }
  };
  const onGenreChange = (genre, type) => {
    switch (type) {
      case "add":
        const exists = genreChips.find((chip) => chip._id === genre._id);
        if (exists) return;

        const addedArray = [...genreChips, genre];
        setGenreChips(addedArray);
        setSelectedGenre(genre._id);
        break;
      case "delete":
        const filteredArray = genreChips.filter(
          (chip) => chip._id !== genre._id
        );
        setGenreChips(filteredArray);
        setSelectedGenre("choose");
        break;
      default:
        break;
    }
  };

  const handleSearchChange = (field, value) => {
    setBookName(value);
  };

  const handleCreditsChange = (field, value) => {
    setBookCredits(value);
  };

  const handleReset = () => {
    setBookName("");
    setBookCredits("");
    setAuthorChips([]);
    setGenreChips([]);
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
        <Filters
          bookName={bookName}
          handleSearchChange={handleSearchChange}
          onAuthorChange={onAuthorChange}
          selectedAuthor={selectedAuthor}
          authorsResponse={authorsResponse}
          authorChips={authorChips}
          onGenreChange={onGenreChange}
          genresResponse={genresResponse}
          selectedGenre={selectedGenre}
          genreChips={genreChips}
          handleCreditsChange={handleCreditsChange}
          handleReset={handleReset}
        />

        {/* <div className={classes.books}> */}
        <Row
          xs={24}
          sm={24}
          md={24}
          lg={24}
          style={{ rowGap: "40px", columnGap: "65px" }}
        >
          {currentBooks.map((item) => (
            <Col xs={24} sm={12} md={5} lg={5}>
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
