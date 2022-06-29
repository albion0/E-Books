import { useState } from 'react';
import { TablePagination } from '@mui/material';

import MyBook from "./MyBook/MyBook";
import Filters from "../Books/Filters/Filters";
import Footer from "../Footer/Footer";
import classes from "./MyBooks.module.css";
import bookImg from "../../assets/images/book.png";

const booksData = [];

for(let i = 1; i <= 10; i++) {
  booksData.push({
    id: 'key' + i,
    img: bookImg,
    title: "Book " + i,
    desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.", 
    price: 20,
    date: "4/15/2022"
  })
}

const MyBooks = () => {
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

      <div className={classes.books}>
        {booksData.map((item) => (
            <MyBook
              key={item.id}
              img={item.img}
              title={item.title}
              desc={item.desc}
              price={item.price}
              date={item.date} 
            />
          ))}
      </div>

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

export default MyBooks