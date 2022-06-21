import { NavLink } from "react-router-dom";
import classes from "./Navbar.module.css";

const Navbar = () => {
  return ( 
    <header className={classes.header}>
        <h1 className={classes.logo}>
            <NavLink to="/" exact>E-Books</NavLink>
        </h1>
        <ul className={classes.mainnav}>
            <li>
                <NavLink to="/" exact>Home</NavLink>
            </li>
            <li>
                <NavLink to="/books" exact>Books</NavLink>
            </li>
            <li>
                <NavLink to="/my-books" exact>My Books</NavLink>
            </li>
            <li>
                <NavLink to="/payments" exact>Payments</NavLink>
            </li>
            <li>
                <NavLink to="/forum" exact>Forum</NavLink>
            </li>
            <li>
                <NavLink to="/contact-us" exact>Contact Us</NavLink>
            </li>
            <li>
                <NavLink to="/about" exact>About Us</NavLink>
            </li>
            <li>
                <NavLink to="/login" exact>Login</NavLink>
            </li>
            <li>
                <NavLink to="/register" exact>Register</NavLink>
            </li>
        </ul>
    </header> 
    /* 
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
            <li className={classes.item}>
                <NavLink to="/login" className={classes.link} activeClassName={classes.active} exact>Login</NavLink>
            </li>
            <li className={classes.item}>
                <NavLink to="/register" className={classes.link} activeClassName={classes.active} exact>Register</NavLink>
            </li>
        </ul>
    </nav>
    */
    
  )
}

export default Navbar