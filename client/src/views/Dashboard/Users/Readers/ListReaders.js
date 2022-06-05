import MUIDataTable from "mui-datatables";
import React, { useState, useEffect } from "react";
import { Spin, Button, Image } from "antd";
import { useDispatch, useSelector } from "react-redux";
import {
  getAllUsers,
  clearGetAllUsers,
} from "../../../../store/actions/actions";
import {
  LoadingOutlined,
  FilterOutlined,
  MinusCircleOutlined,
} from "@ant-design/icons";

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

const getMUIColumns = () => ["Username", "Email", "Credits"];

const getMUIData = (docs) => {
  return docs.map((user) => {
    return [user.username, user.email, user.credits];
  });
};

export const ListReaders = ({}) => {
  const [isLoading, setIsLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(defaultPage);
  const [currentLimit, setCurrentLimit] = useState(defaultLimit);
  const [currentReaders, setCurrentReaders] = useState([]);
  const [currentTotal, setCurrentTotal] = useState(0);

  const dispatch = useDispatch();

  const getAllResponse = useSelector(({ auth }) => auth.getAll);

  useEffect(() => {
    return () => {
      dispatch(clearGetAllUsers());
    };
  }, []);

  useEffect(() => {
    const params = {
      page: currentPage + 1,
      limit: currentLimit,
      pagination: true,
    };
    dispatch(getAllUsers(params));
  }, [currentPage, currentLimit]);

  useEffect(() => {
    if (getAllResponse && getAllResponse.loading) {
      setIsLoading(true);
    } else if (getAllResponse && getAllResponse.success) {
      setIsLoading(false);

      const { docs, totalDocs } = getAllResponse.data.users;
      setCurrentReaders(getMUIData(docs));
      setCurrentTotal(totalDocs);
    } else if (getAllResponse && getAllResponse.error) {
      setIsLoading(false);
    }
  }, [getAllResponse]);

  const onChangePage = (page) => {
    setCurrentPage(page);
  };

  const onChangeRowsPerPage = (limit) => {
    setCurrentPage(defaultPage);
    setCurrentLimit(limit);
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
      <MUIDataTable
        data={currentReaders}
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
