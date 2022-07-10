// Imports: local files.
import {
  COUNTS_START,
  COUNTS_SUCCESS,
  COUNTS_FAILED,
  COUNTS_RESET,
} from "../actions/actions";

const initialLoadingState = {
  loading: false,
  success: false,
  data: null,
  error: false,
  errorMessage: null,
};
const initialState = {
  counts: initialLoadingState,
};

const reportsReducer = (state = initialState, action) => {
  switch (action.type) {
    /**
     * =======================================================================
     * Counts
     * =======================================================================
     */
    case COUNTS_START:
      return { ...state, counts: { ...action.payload } };
    case COUNTS_SUCCESS:
      return { ...state, counts: { ...action.payload } };
    case COUNTS_FAILED:
      return { ...state, counts: { ...action.payload } };
    case COUNTS_RESET:
      return { ...state, counts: { ...initialLoadingState } };
    default:
      return state;
  }
};

export default reportsReducer;
