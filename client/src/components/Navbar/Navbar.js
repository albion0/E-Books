import { NavLink } from "react-router-dom";
import classes from "./Navbar.module.css";
import jwtDecode from "jwt-decode";
import logo from "../../assets/images/potentiallogo.png";
import { useHistory, Redirect } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Button, Spin } from "antd";
import { LogoutOutlined } from "@ant-design/icons";
import { useEffect, useState } from "react";
import { clearGetOneUser, getOneUser } from "../../store/actions/actions";
import {
  LoadingOutlined,
  UserOutlined,
  DollarCircleOutlined,
} from "@ant-design/icons";

const Navbar = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const token = localStorage.getItem("eBook-token");

  const [loading, setLoading] = useState(true);

  const userResponse = useSelector(({ auth }) => auth.getOne);

  let userId;
  let userRole;
  if (token) {
    const { id, role } = jwtDecode(token);
    userId = id;
    userRole = role;
  }

  useEffect(() => {
    return () => {
      dispatch(clearGetOneUser());
    };
  }, []);

  useEffect(() => {
    if (userId) {
      dispatch(getOneUser({ userId }));
    }
  }, []);

  const handleLogout = () => {
    localStorage.clear();
    history.push("/");
  };

  useEffect(() => {
    if (userResponse) {
      switch (true) {
        case userResponse.loading:
          setLoading(true);
          break;
        case userResponse.success:
          setLoading(false);
          break;
        case userResponse.error:
          setLoading(false);
          break;
        default:
          break;
      }
    }
  }, [userResponse]);

  if (userRole === "admin") return <Redirect to="/dashboard" />;
  return (
    <header className={classes.header}>
      <h1 className={classes.logo}>
        <NavLink to="/" exact>
          {/* E-Books */}
          <img className={classes.photo} src={logo} />
        </NavLink>
      </h1>
      <ul className={classes.mainnav}>
        <li>
          <NavLink to="/" exact>
            Home
          </NavLink>
        </li>
        <li>
          <NavLink to="/books" exact>
            Books
          </NavLink>
        </li>
        <li>
          <NavLink to="/about" exact>
            About & Contact Us
          </NavLink>
        </li>
        {token ? (
          <>
            <li>
              <NavLink to="/my-books" exact>
                My Books
              </NavLink>
            </li>
            <li>
              <NavLink to="/payments" exact>
                Payments
              </NavLink>
            </li>
            <li>
              <NavLink to="/forum" exact>
                Forum
              </NavLink>
            </li>
            <li>
              <NavLink to="/profile" exact>
                <UserOutlined style={{ paddingRight: "5px" }} />
                {loading ? (
                  <Spin
                    indicator={
                      <LoadingOutlined style={{ fontSize: 15 }} spin />
                    }
                  />
                ) : userResponse.data?.user ? (
                  userResponse.data.user.username
                ) : (
                  "NA"
                )}
              </NavLink>
            </li>
            <li>
              <NavLink to="/payments" exact>
                <DollarCircleOutlined style={{ paddingRight: "5px" }} />
                {loading ? (
                  <Spin
                    indicator={
                      <LoadingOutlined style={{ fontSize: 15 }} spin />
                    }
                  />
                ) : userResponse.data?.user ? (
                  userResponse.data.user.credits
                ) : (
                  "NA"
                )}
              </NavLink>
            </li>
            <li>
              <Button
                className="pb-1"
                onClick={handleLogout}
                style={{
                  border: "none",
                  backgroundColor: "transparent",
                  height: "26px",
                }}
              >
                <LogoutOutlined
                  style={{ fontSize: "15px", marginBottom: "3px" }}
                />
              </Button>
            </li>
          </>
        ) : (
          <>
            <li>
              <NavLink to="/login" exact>
                Login
              </NavLink>
            </li>
            <li>
              <NavLink to="/register" exact>
                Register
              </NavLink>
            </li>
          </>
        )}
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
  );
};

export default Navbar;
