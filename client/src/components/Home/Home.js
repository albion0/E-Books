//import Cards from "./Cards/Cards";
//import classes from "./Home.module.css";
//import bookImg from "../../assets/images/book.png";
import "./Home.css";
import book1 from "./image/book-1.png";
import book2 from "./image/book-2.png";
import book3 from "./image/book-3.png";
import book4 from "./image/book-4.png";
import book5 from "./image/book-5.png";
import book6 from "./image/book-6.png";
import stand from "./image/stand.png";
import Footer from "../Footer/Footer";
// import Swiper JS
import Swiper from 'swiper';
// import Swiper styles
import 'swiper/css';

const swiper = new Swiper(".books-slider", {
  loop:true,
  centeredSlides: true,
  autoplay: {
    delay: 9500,
    disableOnInteraction: false,
  },
  breakpoints: {
    0: {
      slidesPerView: 1,
    },
    768: {
      slidesPerView: 2,
    },
    1024: {
      slidesPerView: 3,
    },
  },
});


const Home = () => {
  return (
    <section className="home" id="home">
      <div className="row">
          <div className="content">
              <h3>Welcome to eBooks</h3>
              <p>~ Board in and let your imagination take off and reach impeccable heights meant to open new doors and opportunities to enhance your lifes! ~</p>
              <a href="/books" className="btn">click me to see more books</a>
          </div>

          <div className="swiper books-slider">
              <div className="swiper-wrapper">
                  <a href="#" className="swiper slide"><img src={book1} alt=""/></a>
                  <a href="#" className="swiper slide"><img src={book2} alt=""/></a>
                  <a href="#" className="swiper slide"><img src={book3} alt=""/></a>
                  <a href="#" className="swiper slide"><img src={book4} alt=""/></a>
                  <a href="#" className="swiper slide"><img src={book5} alt=""/></a>
                  <a href="#" className="swiper slide"><img src={book6} alt=""/></a>
              </div>
              <img src={stand} className="stand" alt=""/>
          </div>
      </div>
      <Footer/>
    </section>
  )
}

export default Home

