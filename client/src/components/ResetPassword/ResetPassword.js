import { useState, useEffect } from "react";
import { NavLink, useHistory, useLocation, Redirect } from "react-router-dom";
import { IconContext } from "react-icons";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import useInput from "../../hooks/useInput";
import { validateEmail, validatePassword } from "../../helpers/helpers";
import classes from "../Login/Login.module.css";
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
import {
  getAllUsers,
  loginUser,
  resetPassUser,
} from "../../store/actions/auth";
import { Buffer } from "buffer";

const ResetPassword = () => {
  const {
    register,
    handleSubmit,
    setValue,
    getValues,
    formState: { errors },
  } = useForm();

  const token = localStorage.getItem("eBook-token");

  const dispatch = useDispatch();
  const history = useHistory();
  const location = useLocation();

  const [loading, setLoading] = useState(false);
  const [iconPassword, setIconPassword] = useState(false);

  const resetResponse = useSelector(({ auth }) => auth.resetPass);

  useEffect(() => {
    register("newPassword", {
      required: true,
      validate: (val) => val && val.length > 8,
    });
    register("passwordConfirm", {
      required: false,
    });
  }, [register]);

  useEffect(() => {
    if (resetResponse) {
      switch (true) {
        case resetResponse.loading:
          setLoading(true);
          break;
        case resetResponse.success:
          setLoading(false);
          break;
        case resetResponse.error:
          setLoading(false);
          break;
      }
    }
  }, [resetResponse]);

  const base64 = new URLSearchParams(location.search).get("q");
  if (!base64) {
    history.push("/login");
    return null;
  }
  const information = new URLSearchParams(
    Buffer.from(base64, "base64").toString("utf-8")
  );
  const resetToken = information.get("resetToken");
  const email = information.get("email");

  const onSubmit = (data) => {
    const { newPassword, passwordConfirm } = data;
    const payload = { email, newPassword, passwordConfirm, resetToken };
    const options = {
      toastNotification,
      history,
      pathname: "/login",
      onSuccessMessage: "Password reset successfully!",
      onFailMessage: "Failed to reset password",
    };
    dispatch(resetPassUser(payload, options));
  };

  if (token) return <Redirect to="/" />;
  return (
    <div className={classes.wrapper}>
      <div className={classes.login}>
        <h2 className={classes.heading}>Reset Password</h2>
        <p className={classes.title}>
          Welcome back. Please write new password to continue!
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
                value={email}
                disabled
                className={classes.input}
                // onChange={(e) => setValue("email", e.target.value)}
              />
            </div>
            <div className={classes.inputBox}>
              <div className={classes.passwordBox}>
                <input
                  name="newPassword"
                  type={iconPassword ? "text" : "password"}
                  placeholder="New Password"
                  onChange={(e) => setValue("newPassword", e.target.value)}
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
              {errors.newPassword && (
                <span style={{ color: "red" }}>
                  Password must contain at least 8 characters!
                </span>
              )}
            </div>

            <div className={classes.inputBox}>
              <div className={classes.passwordBox}>
                <input
                  name="passwordConfirm"
                  type={iconPassword ? "text" : "password"}
                  placeholder="Confirm Password"
                  onChange={(e) => setValue("passwordConfirm", e.target.value)}
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
              {errors.passwordConfirm && (
                <span style={{ color: "red" }}>
                  Password must contain at least 8 characters!
                </span>
              )}
            </div>

            <button className={classes.btn} type="submit">
              Reset
            </button>
          </form>
        )}
      </div>
    </div>
  );
};

export default ResetPassword;
