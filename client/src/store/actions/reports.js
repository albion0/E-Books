// Imports: local files.
import ApiClient from "../../services/ApiClient";

// Action Types: Counts.
export const COUNTS_START = "COUNTS_START";
export const COUNTS_SUCCESS = "COUNTS_SUCCESS";
export const COUNTS_FAILED = "COUNTS_FAILED";
export const COUNTS_RESET = "COUNTS_RESET";

// Action Creators: Counts.
const countsStart = (payload) => ({
  type: COUNTS_START,
  payload,
});
const countsSuccess = (payload) => ({
  type: COUNTS_SUCCESS,
  payload,
});
const countsFailed = (payload) => ({
  type: COUNTS_FAILED,
  payload,
});
const countsReset = () => ({ type: COUNTS_RESET });

// Actions: Counts.
export const counts = (payload) => {
  return async (dispatch) => {
    dispatch(
      countsStart({
        loading: true,
        success: false,
        data: null,
        error: false,
        errorMessage: null,
      })
    );

    try {
      const { startDate, endDate } = payload;
      const query = {};
      if (startDate) query["startDate"] = startDate;
      if (endDate) query["endDate"] = endDate;
      const result = await ApiClient.post("reports/counts", query);
      if (result.data?.success) {
        const { counts } = result.data.data;
        dispatch(
          countsSuccess({
            loading: false,
            success: true,
            data: { counts },
            error: false,
            errorMessage: null,
          })
        );
      } else {
        dispatch(
          countsFailed({
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
        countsFailed({
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

// Actions: Clear Counts.
export const clearCounts = () => countsReset();
