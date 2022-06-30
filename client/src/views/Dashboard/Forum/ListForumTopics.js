import MUIDataTable from "mui-datatables";
import React, { useState, useEffect } from "react";
import { Spin, Button, Modal } from "antd";
import { useDispatch, useSelector } from "react-redux";
import {
  getAllForumTopics,
  clearGetAllForumTopics,
  deleteOneForumTopic,
} from "../../../store/actions/actions";
import {
  LoadingOutlined,
  EyeOutlined,
  DeleteOutlined,
} from "@ant-design/icons";
import moment from "moment";
import Swal from "sweetalert2";

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

const getMUIColumns = () => ["Topic", "Created By", "Created At", "Actions"];

const getMUIData = (docs, toggleViewModal, onForumTopicDelete, swalOptions) => {
  return docs.map((forumTopic) => {
    return [
      forumTopic.topic,
      forumTopic.user ? forumTopic.user.username : "NA",
      moment(forumTopic.createdAt).format("DD/MM/YYYY"),
      <div>
        <Button
          type="primary"
          onClick={() => {
            toggleViewModal(forumTopic);
          }}
        >
          <EyeOutlined /> View
        </Button>
        {/* <Button
          style={{ marginLeft: "5px" }}
          type="primary"
          onClick={() => {
            handleModal("edit", true, null, book._id);
          }}
        >
          <EditOutlined /> Edit
        </Button> */}
        <Button
          style={{ marginLeft: "5px" }}
          type="danger"
          onClick={() => {
            Swal.fire(swalOptions).then(
              async (result) =>
                result.isConfirmed && (await onForumTopicDelete(forumTopic.id))
            );
          }}
        >
          <DeleteOutlined /> Delete
        </Button>
      </div>,
    ];
  });
};

export const ListForumTopics = ({}) => {
  const [isLoading, setIsLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(defaultPage);
  const [currentLimit, setCurrentLimit] = useState(defaultLimit);
  const [currentForumTopics, setCurrentForumTopics] = useState([]);
  const [currentTotal, setCurrentTotal] = useState(0);
  const [viewData, setViewData] = useState(null);
  const [isViewVisible, setIsViewVisible] = useState(false);

  const dispatch = useDispatch();

  const getAllResponse = useSelector(({ forumTopics }) => forumTopics.getAll);
  const deletedResponse = useSelector(
    ({ forumTopics }) => forumTopics.deleteOne
  );

  useEffect(() => {
    return () => {
      dispatch(clearGetAllForumTopics());
    };
  }, []);

  useEffect(() => {
    const params = {
      page: currentPage + 1,
      limit: currentLimit,
      pagination: true,
    };
    dispatch(getAllForumTopics(params));
  }, [currentPage, currentLimit]);

  useEffect(() => {
    if (getAllResponse && getAllResponse.loading) {
      setIsLoading(true);
    } else if (getAllResponse && getAllResponse.success) {
      setIsLoading(false);

      const { forumTopics } = getAllResponse.data;
      setCurrentForumTopics(
        getMUIData(
          forumTopics,
          toggleViewModal,
          onForumTopicDelete,
          swalOptions
        )
      );
      setCurrentTotal(forumTopics.length);
    } else if (getAllResponse && getAllResponse.error) {
      setIsLoading(false);
    }
  }, [getAllResponse]);

  useEffect(() => {
    if (deletedResponse && deletedResponse.loading) {
      setIsLoading(true);
    } else if (deletedResponse && deletedResponse.success) {
      setIsLoading(false);
    } else if (deletedResponse && deletedResponse.error) {
      setIsLoading(false);
    }
  }, [deletedResponse]);

  const onChangePage = (page) => {
    setCurrentPage(page);
  };

  const onChangeRowsPerPage = (limit) => {
    setCurrentPage(defaultPage);
    setCurrentLimit(limit);
  };

  const swalOptions = {
    title: "Are you sure?",
    text: "Are you sure you want to delete this Forum Topic? This action cannot be reverted and the data will be lost",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#023142",
    cancelButtonColor: "#ff4d4f",
    confirmButtonText: "Yes, delete!",
    cancelButtonText: "Cancel",
  };

  const recallAllForumTopics = () => {
    setCurrentPage(defaultPage);
    setCurrentLimit(defaultLimit);
    dispatch(
      getAllForumTopics({
        page: defaultPage + 1,
        limit: defaultLimit,
        pagination: true,
      })
    );
  };

  const onForumTopicDelete = async (id) => {
    await dispatch(deleteOneForumTopic({ id }));
    recallAllForumTopics();
  };

  const toggleViewModal = (data) => {
    setViewData(data);
    setIsViewVisible(!isViewVisible);
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
    <div>
      {viewData && (
        <Modal
          visible={isViewVisible}
          onOk={toggleViewModal}
          onCancel={toggleViewModal}
        >
          <p style={{ fontSize: "25px" }}>{viewData.topic}</p>
          <br></br>
          <p>{viewData.content}</p>
        </Modal>
      )}
      <MUIDataTable
        data={currentForumTopics}
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
