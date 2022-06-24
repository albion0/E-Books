// Imports: local files.
import {
  GET_ALL_FORUM_TOPICS_START,
  GET_ALL_FORUM_TOPICS_SUCCESS,
  GET_ALL_FORUM_TOPICS_FAILED,
  GET_ALL_FORUM_TOPICS_RESET,
  GET_ONE_FORUM_TOPIC_START,
  GET_ONE_FORUM_TOPIC_SUCCESS,
  GET_ONE_FORUM_TOPIC_FAILED,
  GET_ONE_FORUM_TOPIC_RESET,
  CREATE_FORUM_TOPIC_START,
  CREATE_FORUM_TOPIC_SUCCESS,
  CREATE_FORUM_TOPIC_FAILED,
  CREATE_FORUM_TOPIC_RESET,
  UPDATE_ONE_FORUM_TOPIC_START,
  UPDATE_ONE_FORUM_TOPIC_SUCCESS,
  UPDATE_ONE_FORUM_TOPIC_FAILED,
  UPDATE_ONE_FORUM_TOPIC_RESET,
  DELETE_ONE_FORUM_TOPIC_START,
  DELETE_ONE_FORUM_TOPIC_SUCCESS,
  DELETE_ONE_FORUM_TOPIC_FAILED,
  DELETE_ONE_FORUM_TOPIC_RESET,
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
  getOne: initialLoadingState,
  create: initialLoadingState,
  updateOne: initialLoadingState,
  deleteOne: initialLoadingState,
};

const forumTopicsReducer = (state = initialState, action) => {
  switch (action.type) {
    /**
     * =======================================================================
     * Get All Forum Topics
     * =======================================================================
     */
    case GET_ALL_FORUM_TOPICS_START:
      return { ...state, getAll: { ...action.payload } };
    case GET_ALL_FORUM_TOPICS_SUCCESS:
      return { ...state, getAll: { ...action.payload } };
    case GET_ALL_FORUM_TOPICS_FAILED:
      return { ...state, getAll: { ...action.payload } };
    case GET_ALL_FORUM_TOPICS_RESET:
      return { ...state, getAll: { ...initialLoadingState } };
    /**
     * =======================================================================
     * Get One Forum Topic
     * =======================================================================
     */
    case GET_ONE_FORUM_TOPIC_START:
      return { ...state, getOne: { ...action.payload } };
    case GET_ONE_FORUM_TOPIC_SUCCESS:
      return { ...state, getOne: { ...action.payload } };
    case GET_ONE_FORUM_TOPIC_FAILED:
      return { ...state, getOne: { ...action.payload } };
    case GET_ONE_FORUM_TOPIC_RESET:
      return { ...state, getOne: { ...initialLoadingState } };
    /**
     * =======================================================================
     * Create New Forum Topic
     * =======================================================================
     */
    case CREATE_FORUM_TOPIC_START:
      return { ...state, create: { ...action.payload } };
    case CREATE_FORUM_TOPIC_SUCCESS:
      return { ...state, create: { ...action.payload } };
    case CREATE_FORUM_TOPIC_FAILED:
      return { ...state, create: { ...action.payload } };
    case CREATE_FORUM_TOPIC_RESET:
      return { ...state, create: { ...initialLoadingState } };
    /**
     * =======================================================================
     * Update One Forum Topic
     * =======================================================================
     */
    case UPDATE_ONE_FORUM_TOPIC_START:
      return { ...state, updateOne: { ...action.payload } };
    case UPDATE_ONE_FORUM_TOPIC_SUCCESS:
      return { ...state, updateOne: { ...action.payload } };
    case UPDATE_ONE_FORUM_TOPIC_FAILED:
      return { ...state, updateOne: { ...action.payload } };
    case UPDATE_ONE_FORUM_TOPIC_RESET:
      return { ...state, updateOne: { ...initialLoadingState } };
    /**
     * =======================================================================
     * Delete One Forum Topic
     * =======================================================================
     */
    case DELETE_ONE_FORUM_TOPIC_START:
      return { ...state, deleteOne: { ...action.payload } };
    case DELETE_ONE_FORUM_TOPIC_SUCCESS:
      return { ...state, deleteOne: { ...action.payload } };
    case DELETE_ONE_FORUM_TOPIC_FAILED:
      return { ...state, deleteOne: { ...action.payload } };
    case DELETE_ONE_FORUM_TOPIC_RESET:
      return { ...state, deleteOne: { ...initialLoadingState } };
    default:
      return state;
  }
};

export default forumTopicsReducer;
