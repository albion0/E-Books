import { useEffect, useState } from "react";
import { NavLink, useHistory } from "react-router-dom";
import { IconContext } from "react-icons";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";

import useInput from "../../hooks/useInput";
import classes from "./Register.module.css";
import {
  validateUsername,
  validatePassword,
  validateEmail,
} from "../../helpers/helpers";
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
import { signUpUser, clearSignUpUser } from "../../store/actions/actions";

const Register = () => {
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
  const [iconConfirmPassword, setIconConfirmPassword] = useState(false);

  const singupResponse = useSelector(({ auth }) => auth.signup);

  useEffect(() => {
    register("username", { required: true });
    register("email", { required: true });
    register("password", {
      required: true,
      validate: (val) => val && val.length > 8,
    });
    register("passwordConfirm", {
      required: true,
      validate: (val) => val && val.length > 8,
    });
    register("credits", {
      required: false,
    });
  }, [register]);

  useEffect(() => {
    return () => {
      dispatch(clearSignUpUser());
    };
  }, []);

  useEffect(() => {
    if (singupResponse) {
      switch (true) {
        case singupResponse.loading:
          setLoading(true);
          break;
        case singupResponse.success:
          setLoading(false);
          break;
        case singupResponse.error:
          setLoading(false);
          break;
      }
    }
  }, [singupResponse]);

  const onSubmit = (data) => {
    const { username, email, password, passwordConfirm } = data;
    dispatch(
      signUpUser(
        { username, email, password, passwordConfirm, credits: "0" },
        {
          toastNotification,
          history,
          pathname: "/login",
          onSuccessMessage: "Signed up successfully!",
          onFailMessage: "Failed to sign up",
          onFailCredentialMessage: "Invalid Credentials",
        }
      )
    );
  };

  return (
    <div className={classes.wrapper}>
      <div className={classes.register}>
        <h2 className={classes.heading}>Sign up</h2>
        <p className={classes.title}>
          Please complete the below steps to register!
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
                type="text"
                name="username"
                placeholder="Username"
                className={classes.input}
                onChange={(e) => setValue("username", e.target.value)}
              />
              {errors.username && (
                <span style={{ color: "red" }}>
                  Please provide a valid username!
                </span>
              )}
            </div>
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
                  Please provide a valid email!
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
            <div className={classes.inputBox}>
              <div className={classes.passwordBox}>
                <input
                  type={iconConfirmPassword ? "text" : "password"}
                  placeholder="Confirm Password"
                  name="passwordConfirm"
                  onChange={(e) => setValue("passwordConfirm", e.target.value)}
                />

                <IconContext.Provider value={{ className: classes.icon }}>
                  {iconConfirmPassword && (
                    <AiOutlineEye
                      onClick={() => setIconConfirmPassword((state) => !state)}
                    />
                  )}
                  {!iconConfirmPassword && (
                    <AiOutlineEyeInvisible
                      onClick={() => setIconConfirmPassword((state) => !state)}
                    />
                  )}
                </IconContext.Provider>
              </div>
              {errors.passwordConfirm && (
                <span style={{ color: "red" }}>
                  Password must contain at least 8 characters!
                </span>
              )}
            </div>

            <button className={classes.btn}>Sign up</button>
          </form>
        )}

        <div className={classes.bottom}>
          <p className={classes.text}>
            Already have an account?{" "}
            <NavLink to="/login" className={classes.highlighted}>
              Login
            </NavLink>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Register;
