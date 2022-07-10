import MUIDataTable from "mui-datatables";
import React, { useState, useEffect } from "react";
import { Button, Tabs, Spin, Modal } from "antd";
import { CreateAuthor } from "./CreateAuthor";
import { EditAuthor } from "./EditAuthor";
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
  getAllAuthors,
  clearGetAllAuthors,
  deleteOneAuthor,
} from "../../../store/actions/actions";
import Swal from "sweetalert2";
import moment from "moment";
import jwtDecode from "jwt-decode";
import Filters from "./Filters";

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

const getMUIColumns = () => ["Name", "Created At", "Actions"];

const getMUIData = (
  docs,
  handleModal,
  toggleViewModal,
  onAuthorDelete,
  swalOptions
) => {
  return docs.map((author) => {
    return [
      author.name,
      moment(author.createdAt).format("DD/MM/YYYY"),
      <div>
        <Button
          type="primary"
          onClick={() => {
            toggleViewModal(author);
          }}
        >
          <EyeOutlined /> View
        </Button>
        <Button
          style={{ marginLeft: "5px" }}
          type="primary"
          onClick={() => {
            handleModal("edit", true, null, author._id);
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
                result.isConfirmed && (await onAuthorDelete(author._id))
            );
          }}
        >
          <DeleteOutlined /> Delete
        </Button>
      </div>,
    ];
  });
};

export const ListAuthors = () => {
  const [modalState, setModal] = useState({
    id: "",
    mode: "",
    isOpen: false,
    authorId: null,
  });
  const [isLoading, setIsLoading] = useState(true);
  const [isViewVisible, setIsViewVisible] = useState(false);
  const [viewData, setViewData] = useState(null);
  const [currentPage, setCurrentPage] = useState(defaultPage);
  const [currentLimit, setCurrentLimit] = useState(defaultLimit);
  const [currentAuthors, setCurrentAuthors] = useState([]);
  const [currentTotal, setCurrentTotal] = useState(0);
  const [authorName, setAuthorName] = useState("");

  const getAllAuthorsResponse = useSelector(({ authors }) => authors.getAll);

  const dispatch = useDispatch();
  const history = useHistory();

  const { TabPane } = Tabs;

  const token = localStorage.getItem("eBook-token");
  const { id } = jwtDecode(token);

  useEffect(() => {
    return () => {
      dispatch(clearGetAllAuthors());
    };
  }, []);

  useEffect(() => {
    dispatch(
      getAllAuthors({
        page: currentPage + 1,
        limit: currentLimit,
        pagination: true,
        authorName: authorName || null,
      })
    );
  }, [currentPage, currentLimit, authorName]);

  useEffect(() => {
    if (getAllAuthorsResponse && getAllAuthorsResponse.loading) {
      setIsLoading(true);
    } else if (getAllAuthorsResponse && getAllAuthorsResponse.success) {
      setIsLoading(false);

      const { docs, totalDocs } = getAllAuthorsResponse.data.authors;
      setCurrentAuthors(
        getMUIData(
          docs,
          handleModal,
          toggleViewModal,
          onAuthorDelete,
          swalOptions
        )
      );
      setCurrentTotal(totalDocs);
    } else if (getAllAuthorsResponse && getAllAuthorsResponse.error) {
      setIsLoading(false);
    }
  }, [getAllAuthorsResponse]);

  const handleModal = (mode, isOpen, id, authorId) => {
    setModal({
      ...modalState,
      ["mode"]: mode,
      ["isOpen"]: isOpen,
      ["id"]: id,
      ["authorId"]: authorId,
    });
  };

  const onChangePage = (page) => {
    setCurrentPage(page);
  };

  const onChangeRowsPerPage = (limit) => {
    setCurrentPage(defaultPage);
    setCurrentLimit(limit);
  };

  const handleSearchChange = (value) => {
    setAuthorName(value);
  };

  const handleReset = () => {
    setAuthorName("");
  };

  const swalOptions = {
    title: "Are you sure?",
    text: "Are you sure you want to delete this author? This action cannot be reverted and the data will be lost",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#023142",
    cancelButtonColor: "#ff4d4f",
    confirmButtonText: "Yes, delete!",
    cancelButtonText: "Cancel",
  };

  const recallAllAuthors = () => {
    setCurrentPage(defaultPage);
    setCurrentLimit(defaultLimit);
    dispatch(
      getAllAuthors({
        page: defaultPage + 1,
        limit: defaultLimit,
        pagination: true,
      })
    );
  };

  const onAuthorDelete = async (id) => {
    await dispatch(deleteOneAuthor({ authorId: id }));
    recallAllAuthors();
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
        handleReset={handleReset}
      />

      {modalState.isOpen && (
        <CreateAuthor
          visible={modalState.mode == "create" && modalState.isOpen}
          recallAllAuthors={recallAllAuthors}
          handleModal={handleModal}
        />
      )}

      {modalState.authorId && (
        <EditAuthor
          authorId={modalState.authorId}
          visible={modalState.mode == "edit" && modalState.isOpen}
          id={modalState.id}
          recallAllAuthors={recallAllAuthors}
          handleModal={handleModal}
        />
      )}

      {viewData && (
        <Modal
          visible={isViewVisible}
          onOk={toggleViewModal}
          onCancel={toggleViewModal}
        >
          <p style={{ fontSize: "25px" }}>{viewData.name}</p>
          <br></br>
          <p dangerouslySetInnerHTML={{ __html: viewData.description }}></p>
        </Modal>
      )}

      <MUIDataTable
        data={currentAuthors}
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
