// Imports: local files.
import {
  GET_ALL_USERS_START,
  GET_ALL_USERS_SUCCESS,
  GET_ALL_USERS_FAILED,
  GET_ALL_USERS_RESET,
  GET_ALL_ADMINS_START,
  GET_ALL_ADMINS_SUCCESS,
  GET_ALL_ADMINS_FAILED,
  GET_ALL_ADMINS_RESET,
  GET_ONE_USER_START,
  GET_ONE_USER_SUCCESS,
  GET_ONE_USER_FAILED,
  GET_ONE_USER_RESET,
  UPDATE_ONE_USER_START,
  UPDATE_ONE_USER_SUCCESS,
  UPDATE_ONE_USER_FAILED,
  UPDATE_ONE_USER_RESET,
  UPLOAD_LOGO_USER_START,
  UPLOAD_LOGO_USER_SUCCESS,
  UPLOAD_LOGO_USER_FAILED,
  UPLOAD_LOGO_USER_RESET,
  DELETE_ONE_USER_START,
  DELETE_ONE_USER_SUCCESS,
  DELETE_ONE_USER_FAILED,
  DELETE_ONE_USER_RESET,
  SIGN_UP_USER_START,
  SIGN_UP_USER_SUCCESS,
  SIGN_UP_USER_FAILED,
  SIGN_UP_USER_RESET,
  LOGIN_USER_START,
  LOGIN_USER_SUCCESS,
  LOGIN_USER_FAILED,
  LOGIN_USER_RESET,
  FORGOT_PASS_USER_START,
  FORGOT_PASS_USER_SUCCESS,
  FORGOT_PASS_USER_FAILED,
  FORGOT_PASS_USER_RESET,
  RESET_PASS_USER_START,
  RESET_PASS_USER_SUCCESS,
  RESET_PASS_USER_FAILED,
  RESET_PASS_USER_RESET,
} from "../actions/actions";

const initialLoadingState = {
  loading: false,
  success: false,
  data: null,
  error: false,
  errorMessage: null,
};
const initialState = {
  getAll: initialLoadingState,
  getAllAdmins: initialLoadingState,
  getOne: initialLoadingState,
  updateOne: initialLoadingState,
  uploadLogo: initialLoadingState,
  deleteOne: initialLoadingState,
  signup: initialLoadingState,
  login: initialLoadingState,
  forgotPass: initialLoadingState,
  resetPass: initialLoadingState,
};

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    /**
     * =======================================================================
     * Get All Users
     * =======================================================================
     */
    case GET_ALL_USERS_START:
      return { ...state, getAll: { ...action.payload } };
    case GET_ALL_USERS_SUCCESS:
      return { ...state, getAll: { ...action.payload } };
    case GET_ALL_USERS_FAILED:
      return { ...state, getAll: { ...action.payload } };
    case GET_ALL_USERS_RESET:
      return { ...state, getAll: { ...initialLoadingState } };
    /**
     * =======================================================================
     * Get All Admins
     * =======================================================================
     */
    case GET_ALL_ADMINS_START:
      return { ...state, getAllAdmins: { ...action.payload } };
    case GET_ALL_ADMINS_SUCCESS:
      return { ...state, getAllAdmins: { ...action.payload } };
    case GET_ALL_ADMINS_FAILED:
      return { ...state, getAllAdmins: { ...action.payload } };
    case GET_ALL_ADMINS_RESET:
      return { ...state, getAllAdmins: { ...initialLoadingState } };
    /**
     * =======================================================================
     * Get One Business
     * =======================================================================
     */
    case GET_ONE_USER_START:
      return { ...state, getOne: { ...action.payload } };
    case GET_ONE_USER_SUCCESS:
      return { ...state, getOne: { ...action.payload } };
    case GET_ONE_USER_FAILED:
      return { ...state, getOne: { ...action.payload } };
    case GET_ONE_USER_RESET:
      return { ...state, getOne: { ...initialLoadingState } };
    /**
     * =======================================================================
     * Update One USER
     * =======================================================================
     */
    case UPDATE_ONE_USER_START:
      return { ...state, updateOne: { ...action.payload } };
    case UPDATE_ONE_USER_SUCCESS:
      return { ...state, updateOne: { ...action.payload } };
    case UPDATE_ONE_USER_FAILED:
      return { ...state, updateOne: { ...action.payload } };
    case UPDATE_ONE_USER_RESET:
      return { ...state, updateOne: { ...initialLoadingState } };
    /**
     * =======================================================================
     * Upload Logo USER
     * =======================================================================
     */
    case UPLOAD_LOGO_USER_START:
      return { ...state, uploadLogo: { ...action.payload } };
    case UPLOAD_LOGO_USER_SUCCESS:
      return { ...state, uploadLogo: { ...action.payload } };
    case UPLOAD_LOGO_USER_FAILED:
      return { ...state, uploadLogo: { ...action.payload } };
    case UPLOAD_LOGO_USER_RESET:
      return { ...state, uploadLogo: { ...initialLoadingState } };
    /**
     * =======================================================================
     * Delete One USER
     * =======================================================================
     */
    case DELETE_ONE_USER_START:
      return { ...state, deleteOne: { ...action.payload } };
    case DELETE_ONE_USER_SUCCESS:
      return { ...state, deleteOne: { ...action.payload } };
    case DELETE_ONE_USER_FAILED:
      return { ...state, deleteOne: { ...action.payload } };
    case DELETE_ONE_USER_RESET:
      return { ...state, deleteOne: { ...initialLoadingState } };
    /**
     * =======================================================================
     * Signup USER
     * =======================================================================
     */
    case SIGN_UP_USER_START:
      return { ...state, signup: { ...action.payload } };
    case SIGN_UP_USER_SUCCESS:
      return { ...state, signup: { ...action.payload } };
    case SIGN_UP_USER_FAILED:
      return { ...state, signup: { ...action.payload } };
    case SIGN_UP_USER_RESET:
      return { ...state, signup: { ...initialLoadingState } };
    /**
     * =======================================================================
     * Login USER
     * =======================================================================
     */
    case LOGIN_USER_START:
      return { ...state, login: { ...action.payload } };
    case LOGIN_USER_SUCCESS:
      return { ...state, login: { ...action.payload } };
    case LOGIN_USER_FAILED:
      return { ...state, login: { ...action.payload } };
    case LOGIN_USER_RESET:
      return { ...state, login: { ...initialLoadingState } };
    /**
     * =======================================================================
     * Forgot Password USER
     * =======================================================================
     */
    case FORGOT_PASS_USER_START:
      return { ...state, forgotPass: { ...action.payload } };
    case FORGOT_PASS_USER_SUCCESS:
      return { ...state, forgotPass: { ...action.payload } };
    case FORGOT_PASS_USER_FAILED:
      return { ...state, forgotPass: { ...action.payload } };
    case FORGOT_PASS_USER_RESET:
      return { ...state, forgotPass: { ...initialLoadingState } };
    /**
     * =======================================================================
     * Reset Password USER
     * =======================================================================
     */
    case RESET_PASS_USER_START:
      return { ...state, resetPass: { ...action.payload } };
    case RESET_PASS_USER_SUCCESS:
      return { ...state, resetPass: { ...action.payload } };
    case RESET_PASS_USER_FAILED:
      return { ...state, resetPass: { ...action.payload } };
    case RESET_PASS_USER_RESET:
      return { ...state, resetPass: { ...initialLoadingState } };
    default:
      return state;
  }
};

export default authReducer;
