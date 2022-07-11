// Imports: local files.
import ApiClient from "../../services/ApiClient";

// Action Types: Get All Reviews.
export const GET_ALL_REVIEWS_START = "GET_ALL_REVIEWS_START";
export const GET_ALL_REVIEWS_SUCCESS = "GET_ALL_REVIEWS_SUCCESS";
export const GET_ALL_REVIEWS_FAILED = "GET_ALL_REVIEWS_FAILED";
export const GET_ALL_REVIEWS_RESET = "GET_ALL_REVIEWS_RESET";

// Action Creators: Get All BookPurchases.
const getAllReviewsStart = (payload) => ({
  type: GET_ALL_REVIEWS_START,
  payload,
});
const getAllReviewsSuccess = (payload) => ({
  type: GET_ALL_REVIEWS_SUCCESS,
  payload,
});
const getAllReviewsFailed = (payload) => ({
  type: GET_ALL_REVIEWS_FAILED,
  payload,
});
const getAllReviewsReset = () => ({ type: GET_ALL_REVIEWS_RESET });

// Actions: Get All Reviews.
export const getAllReviews = (payload) => {
  return async (dispatch) => {
    dispatch(
      getAllReviewsStart({
        loading: true,
        success: false,
        data: null,
        error: false,
        errorMessage: null,
      })
    );

    try {
      const { page, limit, pagination } = payload;
      const result = await ApiClient.get("reviews", {
        params: { page, limit, pagination },
      });
      if (result.data?.success) {
        const { reviews } = result.data.data;
        dispatch(
          getAllReviewsSuccess({
            loading: false,
            success: true,
            data: { reviews },
            error: false,
            errorMessage: null,
          })
        );
      } else {
        dispatch(
          getAllReviewsFailed({
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
        getAllReviewsFailed({
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

// Actions: Clear Get All Reviews.
export const clearGetAllReviews = () => getAllReviewsReset();
