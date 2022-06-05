// Imports: local files.
import APIClient from "../../services/ApiClient";
import jwtDecode from "jwt-decode";
import Swal from "sweetalert2";

// Action Types: Get All Users.
export const GET_ALL_USERS_START = "GET_ALL_USERS_START";
export const GET_ALL_USERS_SUCCESS = "GET_ALL_USERS_SUCCESS";
export const GET_ALL_USERS_FAILED = "GET_ALL_USERS_FAILED";
export const GET_ALL_USERS_RESET = "GET_ALL_USERS_RESET";

// Action Types: Get All Admins.
export const GET_ALL_ADMINS_START = "GET_ALL_ADMINS_START";
export const GET_ALL_ADMINS_SUCCESS = "GET_ALL_ADMINS_SUCCESS";
export const GET_ALL_ADMINS_FAILED = "GET_ALL_ADMINS_FAILED";
export const GET_ALL_ADMINS_RESET = "GET_ALL_ADMINS_RESET";

// Action Types: Get One USER.
export const GET_ONE_USER_START = "GET_ONE_USER_START";
export const GET_ONE_USER_SUCCESS = "GET_ONE_USER_SUCCESS";
export const GET_ONE_USER_FAILED = "GET_ONE_USER_FAILED";
export const GET_ONE_USER_RESET = "GET_ONE_USER_RESET";

// Action Types: Update One USER.
export const UPDATE_ONE_USER_START = "UPDATE_ONE_USER_START";
export const UPDATE_ONE_USER_SUCCESS = "UPDATE_ONE_USER_SUCCESS";
export const UPDATE_ONE_USER_FAILED = "UPDATE_ONE_USER_FAILED";
export const UPDATE_ONE_USER_RESET = "UPDATE_ONE_USER_RESET";

// Action Types: Upload Logo USER.
export const UPLOAD_LOGO_USER_START = "UPLOAD_LOGO_USER_START";
export const UPLOAD_LOGO_USER_SUCCESS = "UPLOAD_LOGO_USER_SUCCESS";
export const UPLOAD_LOGO_USER_FAILED = "UPLOAD_LOGO_USER_FAILED";
export const UPLOAD_LOGO_USER_RESET = "UPLOAD_LOGO_USER_RESET";

// Action Types: Delete One USER.
export const DELETE_ONE_USER_START = "DELETE_ONE_USER_START";
export const DELETE_ONE_USER_SUCCESS = "DELETE_ONE_USER_SUCCESS";
export const DELETE_ONE_USER_FAILED = "DELETE_ONE_USER_FAILED";
export const DELETE_ONE_USER_RESET = "DELETE_ONE_USER_RESET";

// Action Types: Sign Up USER.
export const SIGN_UP_USER_START = "SIGN_UP_USER_START";
export const SIGN_UP_USER_SUCCESS = "SIGN_UP_USER_SUCCESS";
export const SIGN_UP_USER_FAILED = "SIGN_UP_USER_FAILED";
export const SIGN_UP_USER_RESET = "SIGN_UP_USER_RESET";

// Action Types: Login USER.
export const LOGIN_USER_START = "LOGIN_USER_START";
export const LOGIN_USER_SUCCESS = "LOGIN_USER_SUCCESS";
export const LOGIN_USER_FAILED = "LOGIN_USER_FAILED";
export const LOGIN_USER_RESET = "LOGIN_USER_RESET";

// Action Types: Forgot Password USER.
export const FORGOT_PASS_USER_START = "FORGOT_PASS_USER_START";
export const FORGOT_PASS_USER_SUCCESS = "FORGOT_PASS_USER_SUCCESS";
export const FORGOT_PASS_USER_FAILED = "FORGOT_PASS_USER_FAILED";
export const FORGOT_PASS_USER_RESET = "FORGOT_PASS_USER_RESET";

// Action Types: Reset Password USER.
export const RESET_PASS_USER_START = "RESET_PASS_USER_START";
export const RESET_PASS_USER_SUCCESS = "RESET_PASS_USER_SUCCESS";
export const RESET_PASS_USER_FAILED = "RESET_PASS_USER_FAILED";
export const RESET_PASS_USER_RESET = "RESET_PASS_USER_RESET";

// Action Creators: Get All Users.
const getAllUsersStart = (payload) => ({
  type: GET_ALL_USERS_START,
  payload,
});
const getAllUsersSuccess = (payload) => ({
  type: GET_ALL_USERS_SUCCESS,
  payload,
});
const getAllUsersFailed = (payload) => ({
  type: GET_ALL_USERS_FAILED,
  payload,
});
const getAllUsersReset = () => ({ type: GET_ALL_USERS_RESET });

// Action Creators: Get All Admins.
const getAllAdminsStart = (payload) => ({
  type: GET_ALL_ADMINS_START,
  payload,
});
const getAllAdminsSuccess = (payload) => ({
  type: GET_ALL_ADMINS_SUCCESS,
  payload,
});
const getAllAdminsFailed = (payload) => ({
  type: GET_ALL_ADMINS_FAILED,
  payload,
});
const getAllAdminsReset = () => ({ type: GET_ALL_ADMINS_RESET });

// Action Creators: Get One User.
const getOneUserStart = (payload) => ({
  type: GET_ONE_USER_START,
  payload,
});
const getOneUserSuccess = (payload) => ({
  type: GET_ONE_USER_SUCCESS,
  payload,
});
const getOneUserFailed = (payload) => ({
  type: GET_ONE_USER_FAILED,
  payload,
});
const getOneUserReset = () => ({ type: GET_ONE_USER_RESET });

// Action Creators: Update One User.
const updateOneUserStart = (payload) => ({
  type: UPDATE_ONE_USER_SUCCESS,
  payload,
});
const updateOneUserSuccess = (payload) => ({
  type: UPDATE_ONE_USER_START,
  payload,
});
const updateOneUserFailed = (payload) => ({
  type: UPDATE_ONE_USER_FAILED,
  payload,
});
const updateOneUserReset = () => ({ type: UPDATE_ONE_USER_RESET });

// Action Creators: Upload Logo User.
const uploadLogoUserStart = (payload) => ({
  type: UPLOAD_LOGO_USER_START,
  payload,
});
const uploadLogoUserSuccess = (payload) => ({
  type: UPLOAD_LOGO_USER_SUCCESS,
  payload,
});
const uploadLogoUserFailed = (payload) => ({
  type: UPLOAD_LOGO_USER_FAILED,
  payload,
});
const uploadLogoUserReset = () => ({ type: UPLOAD_LOGO_USER_RESET });

// Action Creators: Delete One User.
const deleteOneUserStart = (payload) => ({
  type: DELETE_ONE_USER_START,
  payload,
});
const deleteOneUserSuccess = (payload) => ({
  type: DELETE_ONE_USER_SUCCESS,
  payload,
});
const deleteOneUserFailed = (payload) => ({
  type: DELETE_ONE_USER_FAILED,
  payload,
});
const deleteOneUserReset = () => ({ type: DELETE_ONE_USER_RESET });

// Action Creators: Sing Up.
const signUpUserStart = (payload) => ({
  type: SIGN_UP_USER_START,
  payload,
});
const signUpUserSuccess = (payload) => ({
  type: SIGN_UP_USER_SUCCESS,
  payload,
});
const signUpUserFailed = (payload) => ({
  type: SIGN_UP_USER_FAILED,
  payload,
});
const signUpUserReset = () => ({ type: SIGN_UP_USER_RESET });

// Action Creators: Login.
const loginUserStart = (payload) => ({
  type: LOGIN_USER_START,
  payload,
});
const loginUserSuccess = (payload) => ({
  type: LOGIN_USER_SUCCESS,
  payload,
});
const loginUserFailed = (payload) => ({
  type: LOGIN_USER_FAILED,
  payload,
});
const loginUserReset = () => ({ type: LOGIN_USER_RESET });

// Action Creators: Forgot Password.
const forgotPassUserStart = (payload) => ({
  type: FORGOT_PASS_USER_START,
  payload,
});
const forgotPassUserSuccess = (payload) => ({
  type: FORGOT_PASS_USER_SUCCESS,
  payload,
});
const forgotPassUserFailed = (payload) => ({
  type: FORGOT_PASS_USER_FAILED,
  payload,
});
const forgotPassUserReset = () => ({ type: FORGOT_PASS_USER_RESET });

// Action Creators: Reset Password.
const resetPassUserStart = (payload) => ({
  type: RESET_PASS_USER_START,
  payload,
});
const resetPassUserSuccess = (payload) => ({
  type: RESET_PASS_USER_SUCCESS,
  payload,
});
const resetPassUserFailed = (payload) => ({
  type: RESET_PASS_USER_FAILED,
  payload,
});
const resetPassUserReset = () => ({ type: RESET_PASS_USER_RESET });

// Actions: Get All Users.
export const getAllUsers = (payload) => {
  return async (dispatch) => {
    dispatch(
      getAllUsersStart({
        loading: true,
        success: false,
        data: null,
        error: false,
        errorMessage: null,
      })
    );

    try {
      const { page, limit, pagination, sort } = payload;
      const result = await APIClient.get("auth", {
        params: {
          page,
          limit,
          pagination,
          sort,
        },
      });
      if (result.data?.success) {
        const { users } = result.data?.data;
        dispatch(
          getAllUsersSuccess({
            loading: false,
            success: true,
            data: { users },
            error: null,
            errorMessage: null,
          })
        );
      } else {
        dispatch(
          getAllUsersFailed({
            loading: false,
            success: false,
            data: null,
            error: true,
            errorMessage: result.data?.error || "Internal Server Error!",
          })
        );
      }
    } catch (error) {
      dispatch(
        getAllUsersFailed({
          loading: false,
          success: false,
          data: null,
          error: true,
          errorMessage: error.message || "Internal Server Error!",
        })
      );
    }
  };
};

// Actions: Clear Get All.
export const clearGetAllUsers = () => getAllUsersReset();

// Actions: Get All Admins.
export const getAllAdmins = (payload) => {
  return async (dispatch) => {
    dispatch(
      getAllAdminsStart({
        loading: true,
        success: false,
        data: null,
        error: false,
        errorMessage: null,
      })
    );

    try {
      const { page, limit, pagination } = payload;
      const result = await APIClient.get("auth", {
        params: {
          page,
          limit,
          pagination,
          queryForAdmins: true,
        },
      });
      if (result.data?.success) {
        const { users } = result.data?.data;
        dispatch(
          getAllAdminsSuccess({
            loading: false,
            success: true,
            data: { admins: users },
            error: null,
            errorMessage: null,
          })
        );
      } else {
        dispatch(
          getAllAdminsFailed({
            loading: false,
            success: false,
            data: null,
            error: true,
            errorMessage: result.data?.error || "Internal Server Error!",
          })
        );
      }
    } catch (error) {
      dispatch(
        getAllAdminsFailed({
          loading: false,
          success: false,
          data: null,
          error: true,
          errorMessage: error.message || "Internal Server Error!",
        })
      );
    }
  };
};

// Actions: Clear Get All.
export const clearGetAllAdmins = () => getAllAdminsReset();

// Actions: Get One User.
export const getOneUser = (payload) => {
  return async (dispatch) => {
    dispatch(
      getOneUserStart({
        loading: true,
        success: false,
        data: null,
        error: false,
        errorMessage: null,
      })
    );

    const { userId } = payload;

    try {
      const result = await APIClient.get(`auth/${userId}`);
      if (result.data?.success) {
        const { user } = result.data?.data;
        dispatch(
          getOneUserSuccess({
            loading: false,
            success: true,
            data: { user },
            error: false,
            errorMessage: null,
          })
        );
      } else {
        dispatch(
          getOneUserFailed({
            loading: false,
            success: false,
            data: null,
            error: true,
            errorMessage: result.data?.error || "Internal Server Error!",
          })
        );
      }
    } catch (error) {
      dispatch(
        getOneUserFailed({
          loading: false,
          success: false,
          data: null,
          error: true,
          errorMessage: error.message || "Internal Server Error!",
        })
      );
    }
  };
};

// Actions: Clear Get One.
export const clearGetOneUser = () => getOneUserReset();

// Actions: Update One User.
export const updateOneUser = (payload, options) => {
  return async (dispatch) => {
    dispatch(
      updateOneUserStart({
        loading: true,
        success: false,
        data: null,
        error: false,
        errorMessage: null,
      })
    );

    const { userId } = payload;
    const {
      showToast,
      toastNotification,
      history,
      pathname,
      onSuccessMessage,
      onFailMessage,
    } = options;
    try {
      const result = await APIClient.put(`auth/${userId}`, {});
      if (result.data?.success) {
        const { user } = result.data.data;
        dispatch(
          updateOneUserSuccess({
            loading: false,
            success: true,
            data: { user },
            error: false,
            errorMessage: null,
          })
        );
        showToast && toastNotification("success", onSuccessMessage);
      } else {
        dispatch(
          updateOneUserFailed({
            loading: false,
            success: false,
            data: null,
            error: true,
            errorMessage: result.data?.error || "Internal Server Error!",
          })
        );
        showToast && toastNotification("error", onFailMessage);
      }
    } catch (error) {
      dispatch(
        updateOneUserFailed({
          loading: false,
          success: false,
          data: null,
          error: true,
          errorMessage: error.message || "Internal Server Error!",
        })
      );
      showToast && toastNotification("error", onFailMessage);
    }
  };
};

// Actions: Clear Update One.
export const clearUpdateOneUser = () => updateOneUserReset();

// Actions: Upload Logo User.
export const uploadLogoUser = (payload, options, showSwal = false) => {
  return async (dispatch) => {
    dispatch(
      uploadLogoUserStart({
        loading: true,
        success: false,
        data: null,
        error: false,
        errorMessage: null,
      })
    );

    const {
      showToast,
      toastNotification,
      shouldRedirect,
      history,
      pathname,
      onSuccessMessage,
      onFailMessage,
      onSuccessMessageEmailSent,
      onSuccessMessageEmail,
    } = options;
    try {
      const { userId, formData } = payload;
      const result = await APIClient.put(`auth/${userId}/logo`, formData);
      if (result.data?.success) {
        const { user } = result.data?.data;
        dispatch(
          uploadLogoUserSuccess({
            loading: false,
            success: true,
            data: { user },
            error: false,
            errorMessage: null,
          })
        );
        if (showSwal) {
          const swalOptions = {
            title: "Photo uploaded successfully!",
            text: "Your photo has been uploaded successfully and you will be able to view it in your profile!",
            icon: "success",
            showCancelButton: false,
            confirmButtonColor: "#023142",
            cancelButtonColor: "#ff4d4f",
            confirmButtonText: "OK",
          };
          Swal.fire(swalOptions).then(
            (result) =>
              result.isConfirmed && shouldRedirect && history.push(pathname)
          );
        } else {
          showToast && toastNotification("success", onSuccessMessage);
          shouldRedirect && history.push(pathname);
        }
      } else {
        dispatch(
          uploadLogoUserFailed({
            loading: false,
            success: false,
            data: null,
            error: true,
            errorMessage: result.data?.error || "Internal Server Error!",
          })
        );
        showToast && toastNotification("error", onSuccessMessage);
      }
    } catch (error) {
      dispatch(
        uploadLogoUserFailed({
          loading: false,
          success: false,
          data: null,
          error: true,
          errorMessage: error.message || "Internal Server Error!",
        })
      );
      showToast && toastNotification("error", onFailMessage);
    }
  };
};

// Actions: Clear Upload Logo.
export const clearUploadLogoUser = () => uploadLogoUserReset();

// Actions: Delete One User.
export const deleteOneUser = (payload) => {
  return async (dispatch) => {
    dispatch(
      deleteOneUserStart({
        loading: true,
        success: false,
        data: null,
        error: false,
        errorMessage: null,
      })
    );
    const { userId } = payload;
    try {
      const result = await APIClient.delete(`auth/${userId}`);
      if (result.data?.success) {
      } else {
      }
    } catch (error) {}
  };
};

// Actions: Clear Delete One.
export const clearDeleteOneUser = () => deleteOneUserReset();

// Actions: Sign Up User.
export const signUpUser = (payload, options) => {
  return async (dispatch) => {
    dispatch(
      signUpUserStart({
        loading: true,
        success: false,
        data: null,
        error: false,
        errorMessage: null,
      })
    );

    const {
      toastNotification,
      history,
      pathname,
      onFailMessage,
      onSuccessMessage,
      userExistsMessage,
    } = options;
    const { email, password, passwordConfirm, username, credits } = payload;
    try {
      const result = await APIClient.post("auth/signup", {
        email: email.toLowerCase(),
        password,
        passwordConfirm,
        username,
        credits,
      });
      if (result.data?.success) {
        const { userId } = result.data.data;
        dispatch(
          signUpUserSuccess({
            loading: false,
            success: true,
            data: { userId },
            error: false,
            errorMessage: null,
          })
        );
      } else {
        dispatch(
          signUpUserFailed({
            loading: false,
            success: false,
            data: null,
            error: true,
            errorMessage: result.data?.error || "Internal Server Error!",
          })
        );
      }
    } catch (error) {
      dispatch(
        signUpUserFailed({
          loading: false,
          success: false,
          data: null,
          error: true,
          errorMessage: error.message || "Internal Server Error!",
        })
      );
      const emailExistsMessage = "USER_EXISTS";
      if (
        error &&
        error.response &&
        error.response.data &&
        error.response.data.errorType &&
        error.response.data.errorType === emailExistsMessage
      ) {
        toastNotification("error", userExistsMessage);
      } else {
        toastNotification("error", onFailMessage);
      }
    }
  };
};

// Actions: Clear Sign Up.
export const clearSignUpUser = () => signUpUserReset();

// Actions: Login User.
export const loginUser = (payload, options) => {
  return async (dispatch) => {
    dispatch(
      loginUserStart({
        loading: true,
        success: false,
        data: null,
        error: false,
        errorMessage: null,
      })
    );

    const {
      toastNotification,
      history,
      pathname,
      onSuccessMessage,
      onFailMessage,
      onFailCredentialMessage,
    } = options;
    try {
      const { email, password, remember } = payload;
      const result = await APIClient.post("auth/login", {
        email: email.toLowerCase(),
        password,
        remember,
      });
      if (result.data?.success) {
        const { token } = result.data.data;
        const { exp } = jwtDecode(token);
        const expiresIn = new Date(exp * 1000).toISOString();
        dispatch({ type: "TOKEN", token });
        dispatch(
          loginUserSuccess({
            loading: false,
            success: true,
            data: { token },
            error: false,
            errorMessage: null,
          })
        );
        localStorage.setItem("eBook-token", token);
        localStorage.setItem("expiresIn", expiresIn);
        history.push(pathname);
        toastNotification("success", onSuccessMessage);
      } else {
        dispatch(
          loginUserFailed({
            loading: false,
            success: false,
            data: null,
            error: true,
            errorMessage: result.data?.error || "Internal Server Error!",
          })
        );
        toastNotification("error", onFailMessage);
      }
    } catch (error) {
      dispatch(
        loginUserFailed({
          loading: false,
          success: false,
          data: null,
          error: true,
          errorMessage: error.message || "Internal Server Error!",
        })
      );
      if (
        error &&
        error.response &&
        error.response.data &&
        error.response.data.errorType &&
        error.response.data.errorType === "INVALID_CREDENTIALS"
      ) {
        toastNotification("error", onFailCredentialMessage);
      } else {
        toastNotification("error", onFailMessage);
      }
    }
  };
};

// Actions: Clear Login.
export const clearLoginUser = () => loginUserReset();

// Actions: Forgot Password User.
export const forgotPassUser = (payload, options) => {
  return async (dispatch) => {
    dispatch(
      forgotPassUserStart({
        loading: true,
        success: false,
        data: null,
        error: false,
        errorMessage: null,
      })
    );

    const {
      toastNotification,
      history,
      pathname,
      onSuccessMessage,
      onFailMessage,
      onUserFailMessage,
    } = options;
    try {
      const { email, emailLanguage } = payload;
      const result = await APIClient.post("auth/forgot", {
        email: email.toLowerCase(),
        emailLanguage,
      });
      if (result.data?.success) {
        dispatch(
          forgotPassUserSuccess({
            loading: false,
            success: true,
            data: result.data.data,
            error: false,
            errorMessage: null,
          })
        );
        toastNotification("success", onSuccessMessage);
      } else {
        dispatch(
          forgotPassUserFailed({
            loading: false,
            success: false,
            data: null,
            error: true,
            errorMessage: result.data?.error || "Internal Server Error!",
          })
        );
        toastNotification("error", onFailMessage);
      }
    } catch (error) {
      dispatch(
        forgotPassUserFailed({
          loading: false,
          success: false,
          data: null,
          error: true,
          errorMessage: error.message || "Internal Server Error!",
        })
      );
      if (
        error &&
        error.response &&
        error.response.data &&
        error.response.data.errorType &&
        error.response.data.errorType === "RESOURCE_NOT_FOUND"
      ) {
        toastNotification("error", onUserFailMessage);
      } else {
        toastNotification("error", onFailMessage);
      }
    }
  };
};

// Actions: Clear Forgot Pass.
export const clearForgotPass = () => forgotPassUserReset();

// Actions: Reset Password User.
export const resetPassUser = (payload, options) => {
  return async (dispatch) => {
    dispatch(
      resetPassUserStart({
        loading: true,
        success: false,
        data: null,
        error: false,
        errorMessage: null,
      })
    );

    const {
      toastNotification,
      history,
      pathname,
      onSuccessMessage,
      onFailMessage,
    } = options;

    try {
      const { email, newPassword, passwordConfirm, resetToken } = payload;
      const result = await APIClient.post(`auth/reset/${resetToken}`, {
        email: email.toLowerCase(),
        newPassword,
        passwordConfirm,
      });
      if (result.data?.success) {
        const { token } = result.data.data;
        const { exp } = jwtDecode(token);
        const expiresIn = new Date(exp * 1000).toISOString();
        dispatch({ type: "TOKEN", token });
        dispatch(
          resetPassUserSuccess({
            loading: false,
            success: true,
            data: { token },
            error: false,
            errorMessage: null,
          })
        );
        localStorage.setItem("expiresIn", expiresIn);
        toastNotification("success", onSuccessMessage);
        history.push(pathname);
      } else {
        dispatch(
          resetPassUserFailed({
            loading: false,
            success: false,
            data: null,
            error: true,
            errorMessage: result.data?.error || "Internal Server Error!",
          })
        );
        toastNotification("error", onFailMessage);
      }
    } catch (error) {
      dispatch(
        resetPassUserFailed({
          loading: false,
          success: false,
          data: null,
          error: true,
          errorMessage: error.message || "Internal Server Error!",
        })
      );
      toastNotification("error", onFailMessage);
    }
  };
};

// Actions: Clear Reset Pass.
export const clearResetPass = () => resetPassUserReset();
