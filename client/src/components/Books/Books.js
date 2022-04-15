import Book from "./Book/Book";

import classes from "./Books.module.css";
import bookImg from "../../assets/images/book.png";
import Filters from "./Filters/Filters";

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

const Books = () => {
  return (
    <div className={classes.wrapper}>
      <Filters />

      <div className={classes.books}>
        {booksData.map((item) => (
          <Book
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

export default Books