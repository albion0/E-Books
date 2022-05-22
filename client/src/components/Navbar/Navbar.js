import { NavLink } from "react-router-dom";
import classes from "./Navbar.module.css";

const Navbar = () => {
  return (
    <nav className={classes.wrapper}>
        <ul className={classes.list}>
            <li className={classes.item}>
                <NavLink to="/" className={classes.link} activeClassName={classes.active} exact>Home</NavLink>
            </li>
            <li className={classes.item}>
                <NavLink to="/books" className={classes.link} activeClassName={classes.active} exact>Books</NavLink>
            </li>
            <li className={classes.item}>
                <NavLink to="/my-books" className={classes.link} activeClassName={classes.active} exact>My Books</NavLink>
            </li>
            <li className={classes.item}>
                <NavLink to="/payments" className={classes.link} activeClassName={classes.active} exact>Payments</NavLink>
            </li>
            <li className={classes.item}>
                <NavLink to="/forum" className={classes.link} activeClassName={classes.active}>Forum</NavLink>
            </li>
            <li className={classes.item}>
                <NavLink to="/contact-us" className={classes.link} activeClassName={classes.active} exact>Contact Us</NavLink>
            </li>
            <li className={classes.item}>
                <NavLink to="/about" className={classes.link} activeClassName={classes.active} exact>About Us</NavLink>
            </li>
        </ul>
    </nav>
  )
}

export default Navbar