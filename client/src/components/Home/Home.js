import Cards from "./Cards/Cards";

import classes from "./Home.module.css";
import bookImg from "../../assets/images/book.png";

const booksData = [];

for(let i = 1; i <= 5; i++) {
  booksData.push({
    id: 'key' + i,
    img: bookImg,
    title: "Book " + i,
    desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.", 
    price: 20,
    date: "4/15/2022"
  })
}

const Home = () => {
  return (
    <div className={classes.wrapper}>
      <Cards title="New Releases" items={booksData} />
      <Cards title="Recommended Books" items={booksData} />
      <Cards title="Best-selling Books" items={booksData} />
    </div>
  )
}

export default Home