//import Cards from "./Cards/Cards";
//import classes from "./Home.module.css";
//import bookImg from "../../assets/images/book.png";
import './Home.css';
import classes from "./Home.module.css";
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
    <section className="home">
      <div className="row">
          <div className="content">
              <h3 className="read">Dear reader, welcome!</h3>
              <p className="sometext">~ Board in and let your imagination take off and reach impeccable heights   meant to open new doors and opportunities to 
                   enhance your lifes.
              </p>
          </div>

          <div className="swiper books-slider">
              <div className="swiper-wrapper">
                  <a href="#" className="swiper slide" id="book"><img src={book1} alt=""/></a>
                  <a href="#" className="swiper slide" id="book"><img src={book2} alt=""/></a>
                  <a href="#" className="swiper slide" id="book"><img src={book3} alt=""/></a>
                  <a href="#" className="swiper slide" id="book"><img src={book4} alt=""/></a>
                  <a href="#" className="swiper slide" id="book"><img src={book5} alt=""/></a>
                  <a href="#" className="swiper slide" id="book"><img src={book6} alt=""/></a>
              </div>
              <img src={stand} className="stand" alt=""/>
          </div>
      </div>
      <div className={classes.event}>
      <section className={classes.sec}>
        <div className={classes.leftBox}>
          <div className={classes.content}>
            <h1 className={classes.title}>Currently best-selling books</h1>
            <p className={classes.parag}>Find below the most "skyrocket" books that have been published this year and are taking away 
            the most attention from our clients. Interested in them or any other? Check the Books section to see more!
            </p>
          </div>
          <div className={classes.events}>
            <ul className={classes.uls}>
              <li className={classes.lis}>
                <div className={classes.time}>
                  <h2 className={classes.h2}>
                    07<br/><span className={classes.span}>June</span>
                  </h2>
                </div>
                <div className={classes.details}>
                  <h3 className={classes.h3}>
                    War and Peace
                  </h3>
                  <p className={classes.parag}>
                    War and Peace broadly focuses on Napoleon's invasion of Russia in 1812 and follows three of the most well-known 
                    characters in literature: Pierre Bezukhov. 
                    
                  </p>
                  <a href="/books" className={classes.a}>View More</a>
                </div>
              </li>
              <li className={classes.lis}>
                <div className={classes.time}>
                  <h2 className={classes.h2}>
                    13<br/><span className={classes.span}>July</span>
                  </h2>
                </div>
                <div className={classes.details}>
                  <h3 className={classes.h3}>
                    Harry Potter and the Deathly Hallows
                  </h3>
                  <p className={classes.parag}>
                  Without the guidance and protection of their professors, Harry, Ron and 
                  Hermione begin a mission to destroy the Horcruxes, the sources of Voldemort's immortality.
                  </p>
                  <a href="#" className={classes.a}>View More</a>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </section>
    </div>
      <Footer/>
    </section>
  )
}

export default Home

