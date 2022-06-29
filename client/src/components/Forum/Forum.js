import { useState } from 'react';
import { TablePagination } from '@mui/material';
import { NavLink } from "react-router-dom";
import Footer from "../Footer/Footer";
import Filters from "./Filters/Filters";

import classes from "./Forum.module.css";
import personImg from "../../assets/images/person.jpg";

const Forum = () => {
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
      <Filters />
      <NavLink to="/forum/add-topic" className={classes.addBtn}>Add Topic</NavLink>
      <table className={classes.table}>
        <thead>
          <tr>
            <td>Title</td>
            <td>Replies</td>
            <td>Last Post</td>
            <td>Date</td>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td className={classes.user}>
              <img src={personImg} alt="Person img" className={classes.img} />
              <div>
                <NavLink to="/forum/id" className={classes.title}>Lorem ipsum dolor sit</NavLink>
                {/* <p className={classes.title}>Lorem ipsum dolor sit</p> */}
                <p className={classes.username}>John</p>
              </div>
            </td>
            <td>
              <p className={classes.text}>19</p>
            </td>
            <td>
              <p className={classes.text}>User99</p>
              <p className={classes.date}>4/02/2022</p>
            </td>
            <td>
              <p className={classes.text}>Friday, 15 April, 2022</p>
            </td>
          </tr>
          <tr>
            <td className={classes.user}>
              <img src={personImg} alt="Person img" className={classes.img} />
              <div>
                <p className={classes.title}>Lorem ipsum dolor sit</p>
                <p className={classes.username}>John</p>
              </div>
            </td>
            <td>
              <p className={classes.text}>19</p>
            </td>
            <td>
              <p className={classes.text}>User99</p>
              <p className={classes.date}>4/02/2022</p>
            </td>
            <td>
              <p className={classes.text}>Friday, 15 April, 2022</p>
            </td>
          </tr>
          <tr>
            <td className={classes.user}>
              <img src={personImg} alt="Person img" className={classes.img} />
              <div>
                <p className={classes.title}>Lorem ipsum dolor sit</p>
                <p className={classes.username}>John</p>
              </div>
            </td>
            <td>
              <p className={classes.text}>19</p>
            </td>
            <td>
              <p className={classes.text}>User99</p>
              <p className={classes.date}>4/02/2022</p>
            </td>
            <td>
              <p className={classes.text}>Friday, 15 April, 2022</p>
            </td>
          </tr>
          <tr>
            <td className={classes.user}>
              <img src={personImg} alt="Person img" className={classes.img} />
              <div>
                <p className={classes.title}>Lorem ipsum dolor sit</p>
                <p className={classes.username}>John</p>
              </div>
            </td>
            <td>
              <p className={classes.text}>19</p>
            </td>
            <td>
              <p className={classes.text}>User99</p>
              <p className={classes.date}>4/02/2022</p>
            </td>
            <td>
              <p className={classes.text}>Friday, 15 April, 2022</p>
            </td>
          </tr>
          <tr>
            <td className={classes.user}>
              <img src={personImg} alt="Person img" className={classes.img} />
              <div>
                <p className={classes.title}>Lorem ipsum dolor sit</p>
                <p className={classes.username}>John</p>
              </div>
            </td>
            <td>
              <p className={classes.text}>19</p>
            </td>
            <td>
              <p className={classes.text}>User99</p>
              <p className={classes.date}>4/02/2022</p>
            </td>
            <td>
              <p className={classes.text}>Friday, 15 April, 2022</p>
            </td>
          </tr>
        </tbody>
      </table>

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
      <Footer/>
    </div>
  )
}

export default Forum