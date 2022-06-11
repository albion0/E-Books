import { useState, useEffect } from "react";
import { NavLink, useHistory } from "react-router-dom";
import { IconContext } from "react-icons";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import useInput from "../../hooks/useInput";
import { validateEmail, validatePassword } from "../../helpers/helpers";
import classes from "./Login.module.css";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { Form, Button, Row, Upload, Spin, Switch, DatePicker } from "antd";
import {
  UploadOutlined,
  PlusOutlined,
  MinusOutlined,
  LoadingOutlined,
} from "@ant-design/icons";
import { toastNotification } from "../../utils/toastNotification";
import { getAllUsers, loginUser } from "../../store/actions/auth";

const Login = () => {
  const {
    register,
    handleSubmit,
    setValue,
    getValues,
    formState: { errors },
  } = useForm();

  const dispatch = useDispatch();
  const history = useHistory();

  const [loading, setLoading] = useState(false);
  const [iconPassword, setIconPassword] = useState(false);

  const loginResponse = useSelector(({ auth }) => auth.loign);

  const resetFields = () => {
    setValue("email", "");
    setValue("password", "");
    setValue("remember", false);
  };

  useEffect(() => {
    register("email", { required: true });
    register("password", {
      required: true,
      validate: (val) => val && val.length > 8,
    });
    register("remeber", {
      required: false,
    });
  }, [register]);

  const onSubmit = (data) => {
    const { email, password, remember } = data;
    dispatch(
      loginUser(
        { email, password, remember: remember ? remember : false },
        {
          toastNotification,
          history,
          pathname: "/dashboard",
          onSuccessMessage: "Logged in Successfully!",
          onFailMessage: "Failed to log in",
          onFailCredentialMessage: "Invalid Credentials",
        }
      )
    );
  };

  useEffect(() => {
    if (loginResponse) {
      switch (true) {
        case loginResponse.loading:
          setLoading(true);
          break;
        case loginResponse.success:
          setLoading(false);
          break;
        case loginResponse.error:
          setLoading(false);
          break;
      }
    }
  }, [loginResponse]);

  return (
    <div className={classes.wrapper}>
      <div className={classes.login}>
        <h2 className={classes.heading}>Sign in</h2>
        <p className={classes.title}>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit anta vis
          admonitionis inest.
        </p>

        {loading ? (
          <Spin
            indicator={<LoadingOutlined style={{ fontSize: 100 }} spin />}
          />
        ) : (
          <form
            className={classes.form}
            onSubmit={handleSubmit(onSubmit)}
            id="org-form"
            layout="vertical"
            name="basic"
          >
            <div className={classes.inputBox}>
              <input
                type="email"
                name="email"
                placeholder="Email address"
                className={classes.input}
                onChange={(e) => setValue("email", e.target.value)}
              />
              {errors.email && (
                <span style={{ color: "red" }}>
                  Please provide a valid email address. ex: username@gmail.com
                </span>
              )}
            </div>
            <div className={classes.inputBox}>
              <div className={classes.passwordBox}>
                <input
                  name="password"
                  type={iconPassword ? "text" : "password"}
                  placeholder="Password"
                  onChange={(e) => setValue("password", e.target.value)}
                />

                <IconContext.Provider value={{ className: classes.icon }}>
                  {iconPassword && (
                    <AiOutlineEye
                      onClick={() => setIconPassword((state) => !state)}
                    />
                  )}
                  {!iconPassword && (
                    <AiOutlineEyeInvisible
                      onClick={() => setIconPassword((state) => !state)}
                    />
                  )}
                </IconContext.Provider>
              </div>
              {errors.password && (
                <span style={{ color: "red" }}>
                  Password must contain at least 8 characters!
                </span>
              )}
            </div>

            <input
              type="checkbox"
              name="remember"
              className={classes.checkbox}
              onChange={(e) => setValue("remember", e.target.value)}
            />
            <span className={classes.checkboxText}>Remember me</span>

            <button className={classes.btn} type="submit">
              Sign in
            </button>
          </form>
        )}

        <div className={classes.bottom}>
          <p className={classes.text}>
            Not Registered yet?{" "}
            <NavLink to="/register" className={classes.highlighted}>
              Register
            </NavLink>
          </p>
          <span className={classes.line}></span>
          <NavLink to="/forgot-password" className={classes.text}>
            Forgot password
          </NavLink>
        </div>
      </div>
    </div>
  );
};

export default Login;
