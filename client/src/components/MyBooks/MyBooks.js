import MyBook from "./MyBook/MyBook";
import Filters from "../Books/Filters/Filters";

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
    </div>
  )
}

export default MyBooks