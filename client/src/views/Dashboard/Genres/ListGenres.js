import MUIDataTable from "mui-datatables";
import React, { useState, useEffect } from "react";
import { Button, Tabs, Spin, Modal } from "antd";
import { CreateGenre } from "./CreateGenre";
import { EditGenre } from "./EditGenre";
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
  getAllGenres,
  clearGetAllGenres,
  deleteOneGenre,
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
  onGenreDelete,
  swalOptions
) => {
  return docs.map((genre) => {
    return [
      genre.name,
      moment(genre.createdAt).format("DD/MM/YYYY"),
      <div>
        <Button
          type="primary"
          onClick={() => {
            toggleViewModal(genre);
          }}
        >
          <EyeOutlined /> View
        </Button>
        <Button
          style={{ marginLeft: "5px" }}
          type="primary"
          onClick={() => {
            handleModal("edit", true, null, genre._id);
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
                result.isConfirmed && (await onGenreDelete(genre._id))
            );
          }}
        >
          <DeleteOutlined /> Delete
        </Button>
      </div>,
    ];
  });
};

export const ListGenres = () => {
  const [modalState, setModal] = useState({
    id: "",
    mode: "",
    isOpen: false,
    genreId: null,
  });
  const [isLoading, setIsLoading] = useState(true);
  const [isViewVisible, setIsViewVisible] = useState(false);
  const [viewData, setViewData] = useState(null);
  const [currentPage, setCurrentPage] = useState(defaultPage);
  const [currentLimit, setCurrentLimit] = useState(defaultLimit);
  const [currentGenres, setCurrentGenres] = useState([]);
  const [currentTotal, setCurrentTotal] = useState(0);
  const [genreName, setGenreName] = useState("");

  const getAllGenresResponse = useSelector(({ genres }) => genres.getAll);

  const dispatch = useDispatch();
  const history = useHistory();

  const { TabPane } = Tabs;

  const token = localStorage.getItem("eBook-token");
  const { id } = jwtDecode(token);

  useEffect(() => {
    return () => {
      dispatch(clearGetAllGenres());
    };
  }, []);

  useEffect(() => {
    dispatch(
      getAllGenres({
        page: currentPage + 1,
        limit: currentLimit,
        pagination: true,
        genreName: genreName || null,
      })
    );
  }, [currentPage, currentLimit, genreName]);

  useEffect(() => {
    if (getAllGenresResponse && getAllGenresResponse.loading) {
      setIsLoading(true);
    } else if (getAllGenresResponse && getAllGenresResponse.success) {
      setIsLoading(false);

      const { docs, totalDocs } = getAllGenresResponse.data.genres;
      setCurrentGenres(
        getMUIData(
          docs,
          handleModal,
          toggleViewModal,
          onGenreDelete,
          swalOptions
        )
      );
      setCurrentTotal(totalDocs);
    } else if (getAllGenresResponse && getAllGenresResponse.error) {
      setIsLoading(false);
    }
  }, [getAllGenresResponse]);

  const handleModal = (mode, isOpen, id, genreId) => {
    setModal({
      ...modalState,
      ["mode"]: mode,
      ["isOpen"]: isOpen,
      ["id"]: id,
      ["genreId"]: genreId,
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
    text: "Are you sure you want to delete this genre? This action cannot be reverted and the data will be lost",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#023142",
    cancelButtonColor: "#ff4d4f",
    confirmButtonText: "Yes, delete!",
    cancelButtonText: "Cancel",
  };

  const recallAllGenres = () => {
    setCurrentPage(defaultPage);
    setCurrentLimit(defaultLimit);
    dispatch(
      getAllGenres({
        page: defaultPage + 1,
        limit: defaultLimit,
        pagination: true,
      })
    );
  };

  const onGenreDelete = async (id) => {
    await dispatch(deleteOneGenre({ genreId: id }));
    recallAllGenres();
  };

  const toggleViewModal = (data) => {
    setViewData(data);
    setIsViewVisible(!isViewVisible);
  };

  const handleSearchChange = (value) => {
    setGenreName(value);
  };

  const handleReset = () => {
    setGenreName("");
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
        <CreateGenre
          visible={modalState.mode == "create" && modalState.isOpen}
          recallAllGenres={recallAllGenres}
          handleModal={handleModal}
        />
      )}

      {modalState.genreId && (
        <EditGenre
          genreId={modalState.genreId}
          visible={modalState.mode == "edit" && modalState.isOpen}
          id={modalState.id}
          recallAllGenres={recallAllGenres}
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
        data={currentGenres}
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
