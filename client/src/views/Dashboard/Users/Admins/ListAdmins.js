import MUIDataTable from "mui-datatables";
import React, { useState, useEffect } from "react";
import { Spin } from "antd";
import { useDispatch, useSelector } from "react-redux";
import {
  getAllAdmins,
  clearGetAllAdmins,
} from "../../../../store/actions/actions";
import { LoadingOutlined } from "@ant-design/icons";
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

const getMUIColumns = () => ["Email", "Created At"];

const getMUIData = (docs) => {
  return docs.map((admin) => {
    return [admin.email, moment(admin.createdAt).format("DD/MM/YYYY")];
  });
};

export const ListAdmins = ({}) => {
  const [isLoading, setIsLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(defaultPage);
  const [currentLimit, setCurrentLimit] = useState(defaultLimit);
  const [currentAdmins, setCurrentAdmins] = useState([]);
  const [currentTotal, setCurrentTotal] = useState(0);

  const dispatch = useDispatch();

  const getAllResponse = useSelector(({ auth }) => auth.getAllAdmins);

  useEffect(() => {
    return () => {
      dispatch(clearGetAllAdmins());
    };
  }, []);

  useEffect(() => {
    const params = {
      page: currentPage + 1,
      limit: currentLimit,
      pagination: true,
    };
    dispatch(getAllAdmins(params));
  }, [currentPage, currentLimit]);

  useEffect(() => {
    if (getAllResponse && getAllResponse.loading) {
      setIsLoading(true);
    } else if (getAllResponse && getAllResponse.success) {
      setIsLoading(false);

      const { admins } = getAllResponse.data;
      setCurrentAdmins(getMUIData(admins.docs));
      setCurrentTotal(admins.totalDocs);
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
        data={currentAdmins}
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
