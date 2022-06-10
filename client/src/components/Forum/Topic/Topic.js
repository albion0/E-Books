import { useState } from 'react';
import { TablePagination } from '@mui/material';

import User from "./User/User";
import Replies from "./Replies/Replies";
import AddReply from "./AddReply/AddReply";

import classes from "./Topic.module.css";

const Topic = () => {
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalItems, setTotalItems] = useState(100);

  const handleChangePage = (event, newPage) => {
    setCurrentPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setCurrentPage(0);
  };
  
  return (
    <div className={classes.wrapper}>
      <div className={classes.topic}>
        <User />
        <div className={classes.content}>
          <p className={classes.text}>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Cum dolore aliquid eveniet dolorum est, vero ea ut sunt sapiente nostrum. Velit, illum consectetur. Consectetur natus ab modi veniam explicabo harum?</p>
          <p className={classes.text}>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Cum dolore aliquid eveniet dolorum est, vero ea ut sunt sapiente nostrum. Velit, illum consectetur. Consectetur natus ab modi veniam explicabo harum?</p>
          <p className={classes.text}>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Cum dolore aliquid eveniet dolorum est, vero ea ut sunt sapiente nostrum. Velit, illum consectetur. Consectetur natus ab modi veniam explicabo harum?</p>
          <p className={classes.text}>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Cum dolore aliquid eveniet dolorum est, vero ea ut sunt sapiente nostrum. Velit, illum consectetur. Consectetur natus ab modi veniam explicabo harum?</p>
          <p className={classes.text}>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Cum dolore aliquid eveniet dolorum est, vero ea ut sunt sapiente nostrum. Velit, illum consectetur. Consectetur natus ab modi veniam explicabo harum?</p>
          <p className={classes.text}>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Cum dolore aliquid eveniet dolorum est, vero ea ut sunt sapiente nostrum. Velit, illum consectetur. Consectetur natus ab modi veniam explicabo harum?</p>
          <p className={classes.text}>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Cum dolore aliquid eveniet dolorum est, vero ea ut sunt sapiente nostrum. Velit, illum consectetur. Consectetur natus ab modi veniam explicabo harum?</p>
          <p className={classes.text}>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Cum dolore aliquid eveniet dolorum est, vero ea ut sunt sapiente nostrum. Velit, illum consectetur. Consectetur natus ab modi veniam explicabo harum?</p>
        
          <p className={classes.date}>15 April, 2022</p>
        </div>
      </div>

      <AddReply />
      <Replies />

      <div className={classes.pagination}>
        <TablePagination
          component="div"
          count={totalItems}
          page={currentPage}
          onPageChange={handleChangePage}
          rowsPerPage={rowsPerPage}
          onRowsPerPageChange={handleChangeRowsPerPage}
          style={{ marginBottom: '20px' }}
          className={classes.table}
        />
      </div>
    </div>
  )
}

export default Topic