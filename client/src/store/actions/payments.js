// Imports: local files.
import ApiClient from "../../services/ApiClient";

// Action Types: Get All Payments.
export const GET_ALL_PAYMENTS_START = "GET_ALL_PAYMENTS_START";
export const GET_ALL_PAYMENTS_SUCCESS = "GET_ALL_PAYMENTS_SUCCESS";
export const GET_ALL_PAYMENTS_FAILED = "GET_ALL_PAYMENTS_FAILED";
export const GET_ALL_PAYMENTS_RESET = "GET_ALL_PAYMENTS_RESET";

// Action Types: Get One Payment.
export const GET_ONE_PAYMENT_START = "GET_ONE_PAYMENT_START";
export const GET_ONE_PAYMENT_SUCCESS = "GET_ONE_PAYMENT_SUCCESS";
export const GET_ONE_PAYMENT_FAILED = "GET_ONE_PAYMENT_FAILED";
export const GET_ONE_PAYMENT_RESET = "GET_ONE_PAYMENT_RESET";

// Action Types: Create New Payment.
export const CREATE_PAYMENT_START = "CREATE_PAYMENT_START";
export const CREATE_PAYMENT_SUCCESS = "CREATE_PAYMENT_SUCCESS";
export const CREATE_PAYMENT_FAILED = "CREATE_PAYMENT_FAILED";
export const CREATE_PAYMENT_RESET = "CREATE_PAYMENT_RESET";

// Action Types: Update One Payment.
export const UPDATE_ONE_PAYMENT_START = "UPDATE_ONE_PAYMENT_START";
export const UPDATE_ONE_PAYMENT_SUCCESS = "UPDATE_ONE_PAYMENT_SUCCESS";
export const UPDATE_ONE_PAYMENT_FAILED = "UPDATE_ONE_PAYMENT_FAILED";
export const UPDATE_ONE_PAYMENT_RESET = "UPDATE_ONE_PAYMENT_RESET";

// Action Types: Delete One Payment.
export const DELETE_ONE_PAYMENT_START = "DELETE_ONE_PAYMENT_START";
export const DELETE_ONE_PAYMENT_SUCCESS = "DELETE_ONE_PAYMENT_SUCCESS";
export const DELETE_ONE_PAYMENT_FAILED = "DELETE_ONE_PAYMENT_FAILED";
export const DELETE_ONE_PAYMENT_RESET = "DELETE_ONE_PAYMENT_RESET";

// Action Creators: Get All Payments.
const getAllPaymentsStart = (payload) => ({
  type: GET_ALL_PAYMENTS_START,
  payload,
});
const getAllPaymentsSuccess = (payload) => ({
  type: GET_ALL_PAYMENTS_SUCCESS,
  payload,
});
const getAllPaymentsFailed = (payload) => ({
  type: GET_ALL_PAYMENTS_FAILED,
  payload,
});
const getAllPaymentsReset = () => ({ type: GET_ALL_PAYMENTS_RESET });

// Action Creators: Get One Payment.
const getOnePaymentStart = (payload) => ({
  type: GET_ONE_PAYMENT_START,
  payload,
});
const getOnePaymentSuccess = (payload) => ({
  type: GET_ONE_PAYMENT_SUCCESS,
  payload,
});
const getOnePaymentFailed = (payload) => ({
  type: GET_ONE_PAYMENT_FAILED,
  payload,
});
const getOnePaymentReset = () => ({ type: GET_ONE_PAYMENT_RESET });

// Action Creators: Create New Payment.
const createPaymentStart = (payload) => ({
  type: CREATE_PAYMENT_START,
  payload,
});
const createPaymentSuccess = (payload) => ({
  type: CREATE_PAYMENT_SUCCESS,
  payload,
});
const createPaymentFailed = (payload) => ({
  type: CREATE_PAYMENT_FAILED,
  payload,
});
const createPaymentReset = () => ({ type: CREATE_PAYMENT_RESET });

// Action Creators: Update One Payment.
const updateOnePaymentStart = (payload) => ({
  type: UPDATE_ONE_PAYMENT_START,
  payload,
});
const updateOnePaymentSuccess = (payload) => ({
  type: UPDATE_ONE_PAYMENT_SUCCESS,
  payload,
});
const updateOnePaymentFailed = (payload) => ({
  type: UPDATE_ONE_PAYMENT_FAILED,
  payload,
});
const updateOnePaymentReset = () => ({
  type: UPDATE_ONE_PAYMENT_RESET,
});

// Action Creators: Delete One Payment.
const deleteOnePaymentStart = (payload) => ({
  type: DELETE_ONE_PAYMENT_START,
  payload,
});
const deleteOnePaymentSuccess = (payload) => ({
  type: DELETE_ONE_PAYMENT_SUCCESS,
  payload,
});
const deleteOnePaymentFailed = (payload) => ({
  type: DELETE_ONE_PAYMENT_FAILED,
  payload,
});
const deleteOnePaymentReset = () => ({
  type: DELETE_ONE_PAYMENT_RESET,
});

// Actions: Get All Payments.
export const getAllPayments = (payload) => {
  return async (dispatch) => {
    dispatch(
      getAllPaymentsStart({
        loading: true,
        success: false,
        data: null,
        error: false,
        errorMessage: null,
      })
    );

    try {
      const { page, limit, pagination } = payload;
      const result = await ApiClient.get("payments", {
        params: { page, limit, pagination },
      });
      if (result.data?.success) {
        const { payments } = result.data.data;
        dispatch(
          getAllPaymentsSuccess({
            loading: false,
            success: true,
            data: { payments },
            error: false,
            errorMessage: null,
          })
        );
      } else {
        dispatch(
          getAllPaymentsFailed({
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
        getAllPaymentsFailed({
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

// Actions: Clear Get All Payments.
export const clearGetAllPayments = () => getAllPaymentsReset();

// Actions: Get One Payment.
export const getOnePayment = (payload) => {
  return async (dispatch) => {
    dispatch(
      getOnePaymentStart({
        loading: true,
        success: false,
        data: null,
        error: false,
        errorMessage: null,
      })
    );

    try {
      const { paymentId } = payload;
      const result = await ApiClient.get(`payments/${paymentId}`);
      if (result.data?.success) {
        const { payment } = result.data.data;
        dispatch(
          getOnePaymentSuccess({
            loading: false,
            success: true,
            data: { payment },
            error: false,
            errorMessage: null,
          })
        );
      } else {
        dispatch(
          getOnePaymentFailed({
            loading: false,
            success: false,
            data: null,
            error: true,
            errorMessage: result.data?.error || "Internal Server  Error!",
          })
        );
      }
    } catch (error) {
      dispatch(
        getOnePaymentFailed({
          loading: false,
          success: false,
          data: null,
          error: true,
          errorMessage: error.message || "Internal Server  Error!",
        })
      );
    }
  };
};

// Actions: Clear Get One Payment.
export const clearGetOnePayment = () => getOnePaymentReset();

// Actions: Create New Payment.
export const createPayment = (payload, options) => {
  return async (dispatch) => {
    dispatch(
      createPaymentStart({
        loading: true,
        success: false,
        data: null,
        error: false,
        errorMessage: null,
      })
    );

    const { amount, user } = payload;
    const {
      toastNotification,
      history,
      pathname,
      onSuccessMessage,
      onFailMessage,
    } = options;

    try {
      const result = await ApiClient.post("payments", {
        amount,
        user,
      });
      if (result.data?.success) {
        const { payment } = result.data.data;
        dispatch(
          createPaymentSuccess({
            loading: false,
            success: true,
            data: { payment },
            error: false,
            errorMessage: null,
          })
        );
        // toastNotification("success", onSuccessMessage);
      } else {
        dispatch(
          createPaymentFailed({
            loading: false,
            success: false,
            data: null,
            error: true,
            errorMessage: result.data?.error || "Internal Server Error!",
          })
        );
        // toastNotification("error", onFailMessage);
      }
    } catch (error) {
      dispatch(
        createPaymentFailed({
          loading: false,
          success: false,
          data: null,
          error: true,
          errorMessage: error.message || "Internal Server Error!",
        })
      );
      //   toastNotification("error", onFailMessage);
    }
  };
};

// Actions: Clear Create New Payment.
export const clearCreateNewPayment = () => createPaymentReset();

// Actions: Update One Payment.
export const updateOnePayment = (payload, options) => {
  return async (dispatch) => {
    dispatch(
      updateOnePaymentStart({
        loading: true,
        success: false,
        data: null,
        error: false,
        errorMessage: null,
      })
    );

    const { paymentId, amount, user } = payload;
    const {
      toastNotification,
      history,
      pathname,
      onSuccessMessage,
      onFailMessage,
    } = options;

    try {
      const result = await ApiClient.put(`payments/${paymentId}`, {
        amount,
        user,
      });
      if (result.data?.success) {
        const { payment } = result.data.data;
        dispatch(
          updateOnePaymentSuccess({
            loading: false,
            success: true,
            data: { payment },
            error: false,
            errorMessage: null,
          })
        );
        // toastNotification("success", onSuccessMessage);
      } else {
        dispatch(
          updateOnePaymentFailed({
            loading: false,
            success: false,
            data: null,
            error: true,
            errorMessage: result.data?.error || "Internal Server Error!",
          })
        );
        // toastNotification("error", onFailMessage);
      }
    } catch (error) {
      dispatch(
        updateOnePaymentFailed({
          loading: false,
          success: false,
          data: null,
          error: true,
          errorMessage: error.message || "Internal Server Error!",
        })
      );
      //   toastNotification("error", onFailMessage);
    }
  };
};

// Actions: Clear Update One Payment.
export const clearUpdateOnePayment = () => updateOnePaymentReset();

// Actions: Delete One Payment.
export const deleteOnePayment = (payload) => {
  return async (dispatch) => {
    dispatch(
      deleteOnePaymentStart({
        loading: true,
        success: false,
        data: null,
        error: false,
        errorMessage: null,
      })
    );

    try {
      const { paymentId } = payload;
      const result = await ApiClient.delete(`payments/${paymentId}`);
      if (result.data?.success) {
        const { payment } = result.data.data;
        dispatch(
          deleteOnePaymentSuccess({
            loading: false,
            success: true,
            data: { payment },
            error: false,
            errorMessage: null,
          })
        );
      } else {
        dispatch(
          deleteOnePaymentFailed({
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
        deleteOnePaymentFailed({
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

// Actions: Clear Delete One Payment.
export const cleareDeleteOnePayment = () => deleteOnePaymentReset();
