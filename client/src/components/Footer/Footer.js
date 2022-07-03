import { NavLink } from "react-router-dom";
import "./Footer.css";

const Footer = () => {
  return (
    <footer className="footer-distributed">
      <div className="footer-left">
        <h3>
          e<span>Books</span>
        </h3>

        <p className="footer-links">
          <a href="#" className="link-1">
            <NavLink to="/" exact>
              Home
            </NavLink>
          </a>

          <a href="#">
            <NavLink to="/books" exact>
              Books
            </NavLink>
          </a>

          <a href="#">
            <NavLink to="/about" exact>
              About & Contact Us
            </NavLink>
          </a>

          <a href="#">
            <NavLink to="/login" exact>
              Login
            </NavLink>
          </a>

          <a href="#">
            <NavLink to="/register" exact>
              Register
            </NavLink>
          </a>
        </p>

        <p className="footer-company-name">All copyrights reserved © 2022</p>
      </div>

      <div className="footer-center">
        <div>
          <i className="fa fa-map-marker"></i>
          <p>
            <span>Road 66 Boulevard Bill Clinton</span> Pristina, Republic of
            Kosovo
          </p>
        </div>

        <div>
          <i className="fa fa-phone"></i>
          <p>+383 44 123 456</p>
        </div>

        <div>
          <i className="fa fa-envelope"></i>
          <p>
            <a href="mailto:support@company.com">support@ebooks.com</a>
          </p>
        </div>
      </div>

      <div className="footer-right">
        <p className="footer-company-about">
          <span>About the website</span>
          eBooks is a reading website where all enthusiasts of books can explore
          and expand their mind curiosities by buying and reading books of their
          wishes and connecting with like-minded people!
        </p>
      </div>
    </footer>
  );
};

export default Footer;
