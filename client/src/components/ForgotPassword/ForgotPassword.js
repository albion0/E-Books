import { useState, useEffect } from "react";
import { NavLink, useHistory } from "react-router-dom";
import { IconContext } from "react-icons";
import { BsArrowLeft } from "react-icons/bs";

import classes from "./ForgotPassword.module.css";
import useInput from "../../hooks/useInput";
import { validateEmail } from "../../helpers/helpers";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { forgotPassUser } from "../../store/actions/auth";
import { toastNotification } from "../../utils/toastNotification";
import { Spin } from "antd";
import { LoadingOutlined } from "@ant-design/icons";

const Login = () => {
  const {
    value,
    validity,
    focusOut,
    error,
    changeHandler,
    focusHandler,
    blurHandler,
  } = useInput(validateEmail);

  const {
    register,
    handleSubmit,
    setValue,
    getValues,
    formState: { errors },
  } = useForm();

  const [loading, setLoading] = useState(false);

  const forgotResponse = useSelector(({ auth }) => auth.forgotPass);

  const dispatch = useDispatch();
  const history = useHistory();

  const resetFields = () => {
    setValue("email", "");
  };

  useEffect(() => {
    register("email", { required: true });
  }, [register]);

  const onSubmit = (data) => {
    const { email } = data;
    dispatch(
      forgotPassUser(
        { email },
        {
          toastNotification,
          history,
          pathname: "/dashboard",
          onSuccessMessage: "Email sent successfully!",
          onFailMessage: "Failed to send email",
        }
      )
    );
  };

  useEffect(() => {
    if (forgotResponse) {
      switch (true) {
        case forgotResponse.loading:
          setLoading(true);
          break;
        case forgotResponse.success:
          setLoading(false);
          break;
        case forgotResponse.error:
          setLoading(false);
          break;
      }
    }
  }, [forgotResponse]);

  return (
    <div className={classes.wrapper}>
      <div className={classes.login}>
        <h2 className={classes.heading}>Reset Password</h2>
        <p className={classes.title}>
          Enter your email address and we'll send you a link to reset your
          password.
        </p>

        {loading ? (
          <Spin indicator={<LoadingOutlined style={{ fontSize: 50 }} spin />} />
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

            <button className={classes.btn} type="submit">
              Request reset link
            </button>
          </form>
        )}

        <div className={classes.bottom}>
          <p className={classes.text}>
            <IconContext.Provider value={{ className: classes.icon }}>
              <BsArrowLeft />
            </IconContext.Provider>
            Back to the{" "}
            <NavLink to="/login" className={classes.highlighted}>
              Login screen
            </NavLink>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
