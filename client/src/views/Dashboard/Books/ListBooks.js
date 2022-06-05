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
} from "../../../store/actions/actions";
import Swal from "sweetalert2";
import moment from "moment";

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

  const getAllBooksResponse = useSelector(({ books }) => books.getAll);

  const dispatch = useDispatch();
  const history = useHistory();

  const token = localStorage.getItem("eBook-token");

  useEffect(() => {
    return () => {
      dispatch(clearGetAllBooks());
    };
  }, []);

  useEffect(() => {
    dispatch(
      getAllBooks({
        page: currentPage + 1,
        limit: currentLimit,
        pagination: true,
      })
    );
  }, [currentPage, currentLimit]);

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
