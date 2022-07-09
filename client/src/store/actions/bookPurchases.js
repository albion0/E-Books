// Imports: local files.
import ApiClient from "../../services/ApiClient";

// Action Types: Get All Book Purchases.
export const GET_ALL_BOOK_PURCHASES_START = "GET_ALL_BOOK_PURCHASES_START";
export const GET_ALL_BOOK_PURCHASES_SUCCESS = "GET_ALL_BOOK_PURCHASES_SUCCESS";
export const GET_ALL_BOOK_PURCHASES_FAILED = "GET_ALL_BOOK_PURCHASES_FAILED";
export const GET_ALL_BOOK_PURCHASES_RESET = "GET_ALL_BOOK_PURCHASES_RESET";

// Action Types: Get One BOOK_PURCHASES.
export const GET_ONE_BOOK_PURCHASE_START = "GET_ONE_BOOK_PURCHASE_START";
export const GET_ONE_BOOK_PURCHASE_SUCCESS = "GET_ONE_BOOK_PURCHASE_SUCCESS";
export const GET_ONE_BOOK_PURCHASE_FAILED = "GET_ONE_BOOK_PURCHASE_FAILED";
export const GET_ONE_BOOK_PURCHASE_RESET = "GET_ONE_BOOK_PURCHASE_RESET";

// Action Types: Create New BOOK_PURCHASE.
export const CREATE_BOOK_PURCHASE_START = "CREATE_BOOK_PURCHASE_START";
export const CREATE_BOOK_PURCHASE_SUCCESS = "CREATE_BOOK_PURCHASE_SUCCESS";
export const CREATE_BOOK_PURCHASE_FAILED = "CREATE_BOOK_PURCHASE_FAILED";
export const CREATE_BOOK_PURCHASE_RESET = "CREATE_BOOK_PURCHASE_RESET";

// Action Types: Update One BOOK_PURCHASE.
export const UPDATE_ONE_BOOK_PURCHASE_START = "UPDATE_ONE_BOOK_PURCHASE_START";
export const UPDATE_ONE_BOOK_PURCHASE_SUCCESS =
  "UPDATE_ONE_BOOK_PURCHASE_SUCCESS";
export const UPDATE_ONE_BOOK_PURCHASE_FAILED =
  "UPDATE_ONE_BOOK_PURCHASE_FAILED";
export const UPDATE_ONE_BOOK_PURCHASE_RESET = "UPDATE_ONE_BOOK_PURCHASE_RESET";

// Action Types: Delete One BOOK_PURCHASE.
export const DELETE_ONE_BOOK_PURCHASE_START = "DELETE_ONE_BOOK_PURCHASE_START";
export const DELETE_ONE_BOOK_PURCHASE_SUCCESS =
  "DELETE_ONE_BOOK_PURCHASE_SUCCESS";
export const DELETE_ONE_BOOK_PURCHASE_FAILED =
  "DELETE_ONE_BOOK_PURCHASE_FAILED";
export const DELETE_ONE_BOOK_PURCHASE_RESET = "DELETE_ONE_BOOK_PURCHASE_RESET";

// Action Creators: Get All BookPurchases.
const getAllBookPurchasesStart = (payload) => ({
  type: GET_ALL_BOOK_PURCHASES_START,
  payload,
});
const getAllBookPurchasesSuccess = (payload) => ({
  type: GET_ALL_BOOK_PURCHASES_SUCCESS,
  payload,
});
const getAllBookPurchasesFailed = (payload) => ({
  type: GET_ALL_BOOK_PURCHASES_FAILED,
  payload,
});
const getAllBookPurchasesReset = () => ({ type: GET_ALL_BOOK_PURCHASES_RESET });

// Action Creators: Get One BookPurchase.
const getOneBookPurchaseStart = (payload) => ({
  type: GET_ONE_BOOK_PURCHASE_START,
  payload,
});
const getOneBookPurchaseSuccess = (payload) => ({
  type: GET_ONE_BOOK_PURCHASE_SUCCESS,
  payload,
});
const getOneBookPurchaseFailed = (payload) => ({
  type: GET_ONE_BOOK_PURCHASE_FAILED,
  payload,
});
const getOneBookPurchaseReset = () => ({ type: GET_ONE_BOOK_PURCHASE_RESET });

// Action Creators: Create New BookPurchase.
const createBookPurchaseStart = (payload) => ({
  type: CREATE_BOOK_PURCHASE_START,
  payload,
});
const createBookPurchaseSuccess = (payload) => ({
  type: CREATE_BOOK_PURCHASE_SUCCESS,
  payload,
});
const createBookPurchaseFailed = (payload) => ({
  type: CREATE_BOOK_PURCHASE_FAILED,
  payload,
});
const createBookPurchaseReset = () => ({ type: CREATE_BOOK_PURCHASE_RESET });

// Action Creators: Update One BookPurchase.
const updateOneBookPurchaseStart = (payload) => ({
  type: UPDATE_ONE_BOOK_PURCHASE_START,
  payload,
});
const updateOneBookPurchaseSuccess = (payload) => ({
  type: UPDATE_ONE_BOOK_PURCHASE_SUCCESS,
  payload,
});
const updateOneBookPurchaseFailed = (payload) => ({
  type: UPDATE_ONE_BOOK_PURCHASE_FAILED,
  payload,
});
const updateOneBookPurchaseReset = () => ({
  type: UPDATE_ONE_BOOK_PURCHASE_RESET,
});

// Action Creators: Delete One BookPurchase.
const deleteOneBookPurchaseStart = (payload) => ({
  type: DELETE_ONE_BOOK_PURCHASE_START,
  payload,
});
const deleteOneBookPurchaseSuccess = (payload) => ({
  type: DELETE_ONE_BOOK_PURCHASE_SUCCESS,
  payload,
});
const deleteOneBookPurchaseFailed = (payload) => ({
  type: DELETE_ONE_BOOK_PURCHASE_FAILED,
  payload,
});
const deleteOneBookPurchaseReset = () => ({
  type: DELETE_ONE_BOOK_PURCHASE_RESET,
});

// Actions: Get All BookPurchases.
export const getAllBookPurchases = (payload) => {
  return async (dispatch) => {
    dispatch(
      getAllBookPurchasesStart({
        loading: true,
        success: false,
        data: null,
        error: false,
        errorMessage: null,
      })
    );

    try {
      const { page, limit, pagination } = payload;
      const result = await ApiClient.get("bookPurchases", {
        params: { page, limit, pagination },
      });
      if (result.data?.success) {
        const { bookPurchases } = result.data.data;
        dispatch(
          getAllBookPurchasesSuccess({
            loading: false,
            success: true,
            data: { bookPurchases },
            error: false,
            errorMessage: null,
          })
        );
      } else {
        dispatch(
          getAllBookPurchasesFailed({
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
        getAllBookPurchasesFailed({
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

// Actions: Clear Get All BookPurchases.
export const clearGetAllBookPurchases = () => getAllBookPurchasesReset();

// Actions: Get One BookPurchase.
export const getOneBookPurchase = (payload) => {
  return async (dispatch) => {
    dispatch(
      getOneBookPurchaseStart({
        loading: true,
        success: false,
        data: null,
        error: false,
        errorMessage: null,
      })
    );

    try {
      const { bookPurchaseId } = payload;
      const result = await ApiClient.get(`bookPurchases/${bookPurchaseId}`);
      if (result.data?.success) {
        const { bookPurchase } = result.data.data;
        dispatch(
          getOneBookPurchaseSuccess({
            loading: false,
            success: true,
            data: { bookPurchase },
            error: false,
            errorMessage: null,
          })
        );
      } else {
        dispatch(
          getOneBookPurchaseFailed({
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
        getOneBookPurchaseFailed({
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

// Actions: Clear Get One BookPurchase.
export const clearGetOneBookPurchase = () => getOneBookPurchaseReset();

// Actions: Create New BookPurchase.
export const createBookPurchase = (payload, options) => {
  return async (dispatch) => {
    dispatch(
      createBookPurchaseStart({
        loading: true,
        success: false,
        data: null,
        error: false,
        errorMessage: null,
      })
    );

    const { bookId, userId } = payload;
    const {
      toastNotification,
      history,
      pathname,
      onSuccessMessage,
      onFailMessage,
      onAuthorExistsMessage,
    } = options;

    try {
      const result = await ApiClient.post("bookPurchases", {
        bookId,
        userId,
      });
      if (result.data?.success) {
        const { bookPurchase } = result.data.data;
        dispatch(
          createBookPurchaseSuccess({
            loading: false,
            success: true,
            data: { bookPurchase },
            error: false,
            errorMessage: null,
          })
        );
        toastNotification("success", onSuccessMessage);
      } else {
        dispatch(
          createBookPurchaseFailed({
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
        createBookPurchaseFailed({
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

// Actions: Clear Create New BookPurchase.
export const clearCreateNewBookPurchase = () => createBookPurchaseReset();

// Actions: Update One BookPurchase.
export const updateOneBookPurchase = (payload, options) => {};

// Actions: Clear Update One BookPurchase.
export const clearUpdateOneBookPurchase = () => updateOneBookPurchaseReset();

// Actions: Delete One BookPurchase.
export const deleteOneBookPurchase = (payload) => {};

// Actions: Clear Delete One BookPurchase.
export const cleareDeleteOneBookPurchase = () => deleteOneBookPurchaseReset();
