import { useEffect, useState } from "react";
import { NavLink, useHistory } from "react-router-dom";

import classes from "../Register/Register.module.css";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { Button, Spin } from "antd";
import { LoadingOutlined } from "@ant-design/icons";
import { toastNotification } from "../../utils/toastNotification";
import { updateOneUser, clearUpdateOneUser } from "../../store/actions/auth";

const Profile = () => {
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

  const userResponse = useSelector(({ auth }) => auth.getOne);
  const updatedResponse = useSelector(({ auth }) => auth.updateOne);

  useEffect(() => {
    register("username", { required: true });
    register("email", { required: true });
    register("credits", {
      required: false,
    });
  }, [register]);

  useEffect(() => {
    return () => {
      dispatch(clearUpdateOneUser());
    };
  }, []);

  useEffect(() => {
    if (userResponse) {
      switch (true) {
        case userResponse.loading:
          setLoading(true);
          break;
        case userResponse.success:
          setValue("email", userResponse.data.user.email);
          setValue("username", userResponse.data.user.username);
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

  useEffect(() => {
    if (updatedResponse) {
      switch (true) {
        case updatedResponse.loading:
          setLoading(true);
          break;
        case updatedResponse.success:
          setLoading(false);
          break;
        case updatedResponse.error:
          setLoading(false);
          break;
        default:
          break;
      }
    }
  }, [updatedResponse]);

  const onSubmit = (data) => {
    const { username, email } = data;
    dispatch(
      updateOneUser(
        {
          userId: userResponse?.data?.user?._id,
          username,
          email,
          credits: userResponse?.data?.user?.credits,
        },
        {
          toastNotification,
          showToast: true,
          history,
          pathname: "/login",
          onSuccessMessage: "Profile updated successfully!",
          onFailMessage: "Failed to update profile",
        }
      )
    );
  };

  return (
    <div className={classes.wrapper}>
      <div className={classes.register}>
        <h2 className={classes.heading}>Update Profile</h2>
        <p className={classes.title}>
          Change the data below in order to update your profile!
        </p>

        {loading ? (
          <Spin
            indicator={<LoadingOutlined style={{ fontSize: 100 }} spin />}
            style={{ margin: "0 auto" }}
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
                defaultValue={getValues("username") || ""}
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
                defaultValue={getValues("email") || ""}
                disabled
                onChange={(e) => setValue("email", e.target.value)}
              />
              {errors.email && (
                <span style={{ color: "red" }}>
                  Please provide a valid email!
                </span>
              )}
            </div>

            <div className={classes.inputBox}>
              <Button
                className="w-100"
                onClick={() => history.push("/payments")}
              >
                Buy Credits
              </Button>
            </div>

            <button className={classes.btn}>Save</button>
          </form>
        )}
      </div>
    </div>
  );
};

export default Profile;
