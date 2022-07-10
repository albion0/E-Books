// title, content, credits, author, genre, photo
import MUIDataTable from "mui-datatables";
import React, { useState, useEffect } from "react";
import { Button, Tabs, Spin, Modal, Image } from "antd";
import { CreateBook } from "./CreateBook";
import { EditBook } from "./EditBook";
import {
  PlusOutlined,
  EditOutlined,
  DeleteOutlined,
  LoadingOutlined,
  EyeOutlined,
} from "@ant-design/icons";
import { Redirect, useHistory } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import {
  getAllBooks,
  clearGetAllBooks,
  deleteOneBook,
  getAllAuthors,
  getAllGenres,
} from "../../../store/actions/actions";
import Swal from "sweetalert2";
import moment from "moment";
import Filters from "../../../components/Books/Filters/Filters";

const defaultPage = 0;
const defaultLimit = 10;

const getMUIOptions = (
  onChangePage,
  onChangeRowsPerPage,
  currentPage,
  currentLimit,
  count
) => {
  return {
    selectableRows: "none",
    print: false,
    filter: false,
    download: false,
    pagination: true,
    search: false,
    serverSide: true,
    selectableRowsHeader: false,
    rowsPerPageOptions: [10, 20, 50],
    onChangePage: onChangePage,
    onChangeRowsPerPage: onChangeRowsPerPage,
    page: currentPage,
    rowsPerPage: currentLimit,
    count: count,
  };
};

const getMUIColumns = () => [
  "Image",
  "Title",
  "Authors",
  "Genres",
  "Credits",
  "Actions",
];

const getMUIData = (
  docs,
  handleModal,
  toggleViewModal,
  onBookDelete,
  swalOptions
) => {
  return docs.map((book) => {
    return [
      <Image
        style={{ objectFit: "contain" }}
        width={100}
        height={100}
        src={book.bookPhoto || ""}
      />,
      book.title,
      book && book.authors
        ? book.authors.map((author) => author.name + "")
        : "NA",
      book && book.genres ? book.genres.map((genre) => genre.name + "") : "NA",
      book.credits,
      <div>
        <Button
          type="primary"
          onClick={() => {
            toggleViewModal(book);
          }}
        >
          <EyeOutlined /> View
        </Button>
        <Button
          style={{ marginLeft: "5px" }}
          type="primary"
          onClick={() => {
            handleModal("edit", true, null, book._id);
          }}
        >
          <EditOutlined /> Edit
        </Button>
        <Button
          style={{ marginLeft: "5px" }}
          type="danger"
          onClick={() => {
            Swal.fire(swalOptions).then(
              async (result) =>
                result.isConfirmed && (await onBookDelete(book._id))
            );
          }}
        >
          <DeleteOutlined /> Delete
        </Button>
      </div>,
    ];
  });
};

export const ListBooks = () => {
  const [modalState, setModal] = useState({
    id: "",
    mode: "",
    isOpen: false,
    bookId: null,
  });
  const [isLoading, setIsLoading] = useState(true);
  const [isViewVisible, setIsViewVisible] = useState(false);
  const [viewData, setViewData] = useState(null);
  const [currentPage, setCurrentPage] = useState(defaultPage);
  const [currentLimit, setCurrentLimit] = useState(defaultLimit);
  const [currentBooks, setCurrentBooks] = useState([]);
  const [currentTotal, setCurrentTotal] = useState(0);
  const [bookName, setBookName] = useState("");
  const [bookCredits, setBookCredits] = useState("");
  const [selectedAuthor, setSelectedAuthor] = useState("choose");
  const [selectedGenre, setSelectedGenre] = useState("choose");
  const [authorChips, setAuthorChips] = useState([]);
  const [genreChips, setGenreChips] = useState([]);

  const getAllBooksResponse = useSelector(({ books }) => books.getAll);
  const authorsResponse = useSelector(({ authors }) => authors.getAll);
  const genresResponse = useSelector(({ genres }) => genres.getAll);

  const dispatch = useDispatch();
  const history = useHistory();

  const token = localStorage.getItem("eBook-token");

  useEffect(() => {
    return () => {
      dispatch(clearGetAllBooks());
    };
  }, []);

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
      setCurrentBooks(
        getMUIData(
          docs,
          handleModal,
          toggleViewModal,
          onBookDelete,
          swalOptions
        )
      );
      setCurrentTotal(totalDocs);
    } else if (getAllBooksResponse && getAllBooksResponse.error) {
      setIsLoading(false);
    }
  }, [getAllBooksResponse]);

  const handleModal = (mode, isOpen, id, bookId) => {
    setModal({
      ...modalState,
      ["mode"]: mode,
      ["isOpen"]: isOpen,
      ["id"]: id,
      ["bookId"]: bookId,
    });
  };

  const onChangePage = (page) => {
    setCurrentPage(page);
  };

  const onChangeRowsPerPage = (limit) => {
    setCurrentPage(defaultPage);
    setCurrentLimit(limit);
  };

  const swalOptions = {
    title: "Are you sure?",
    text: "Are you sure you want to delete this Book? This action cannot be reverted and the data will be lost",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#023142",
    cancelButtonColor: "#ff4d4f",
    confirmButtonText: "Yes, delete!",
    cancelButtonText: "Cancel",
  };

  const recallAllBooks = () => {
    setCurrentPage(defaultPage);
    setCurrentLimit(defaultLimit);
    dispatch(
      getAllBooks({
        page: defaultPage + 1,
        limit: defaultLimit,
        pagination: true,
      })
    );
  };

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

  const onBookDelete = async (id) => {
    await dispatch(deleteOneBook({ bookId: id }));
    recallAllBooks();
  };

  const toggleViewModal = (data) => {
    setViewData(data);
    setIsViewVisible(!isViewVisible);
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
    <div>
      <Button
        type="primary"
        onClick={() => handleModal("create", true)}
        style={{ marginBottom: 20 }}
      >
        <PlusOutlined /> Create
      </Button>

      <Filters
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

      {modalState.isOpen && (
        <CreateBook
          visible={modalState.mode == "create" && modalState.isOpen}
          recallAllBooks={recallAllBooks}
          handleModal={handleModal}
        />
      )}

      {modalState.bookId && (
        <EditBook
          bookId={modalState.bookId}
          visible={modalState.mode == "edit" && modalState.isOpen}
          id={modalState.id}
          recallAllBooks={recallAllBooks}
          handleModal={handleModal}
        />
      )}

      {viewData && (
        <Modal
          visible={isViewVisible}
          onOk={toggleViewModal}
          onCancel={toggleViewModal}
        >
          <p style={{ fontSize: "25px" }}>{viewData.title}</p>
          <br></br>
          <p dangerouslySetInnerHTML={{ __html: viewData.content }}></p>
        </Modal>
      )}

      <MUIDataTable
        data={currentBooks}
        columns={getMUIColumns()}
        options={getMUIOptions(
          onChangePage,
          onChangeRowsPerPage,
          currentPage,
          currentLimit,
          currentTotal
        )}
      />
    </div>
  );
};
