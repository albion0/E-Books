import { NavLink } from "react-router-dom";
import './Footer.css';

const Footer = () => {
    return (
        <footer class="footer-distributed">

			<div class="footer-left">

				<h3>e<span>Books</span></h3>

				<p class="footer-links">
					<a href="#" class="link-1">
                        <NavLink to="/" exact>Home</NavLink>
                    </a>
					
					<a href="#">
                        <NavLink to="/books" exact>Books</NavLink>
                    </a>
				
					<a href="#">
                        <NavLink to="/payments" exact>Payments</NavLink>
                    </a>
				
					<a href="#">
                        <NavLink to="/forum" exact>Forum</NavLink>
                    </a>
					
					<a href="#">
                        <NavLink to="/contact-us" exact>Contact Us</NavLink>
                    </a>
					
					<a href="#">
                        <NavLink to="/about" exact>About Us</NavLink>
                    </a>
				</p>

				<p class="footer-company-name">All copyrights reserved © 2022</p>
			</div>

			<div class="footer-center">

				<div>
					<i class="fa fa-map-marker"></i>
					<p><span>Road 66 Boulevard Bill Clinton</span> Pristina, Republic of Kosovo</p>
				</div>

				<div>
					<i class="fa fa-phone"></i>
					<p>+383-44-123-456</p>
				</div>

				<div>
					<i class="fa fa-envelope"></i>
					<p><a href="mailto:support@company.com">support@ebooks.com</a></p>
				</div>

			</div>

			<div class="footer-right">

				<p class="footer-company-about">
					<span>About the website</span>
                        eBooks is a reading website where all enthusiasts of books can explore and expand their mind curiosities by buying and reading books of their wishes and connecting with like-minded people!
				</p>

			</div>

		</footer>
    )
}

export default Footer