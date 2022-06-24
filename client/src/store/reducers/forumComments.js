// Imports: local files.
import {
  GET_ALL_FORUM_COMMENTS_START,
  GET_ALL_FORUM_COMMENTS_SUCCESS,
  GET_ALL_FORUM_COMMENTS_FAILED,
  GET_ALL_FORUM_COMMENTS_RESET,
  GET_ALL_TOPIC_COMMENTS_START,
  GET_ALL_TOPIC_COMMENTS_SUCCESS,
  GET_ALL_TOPIC_COMMENTS_FAILED,
  GET_ALL_TOPIC_COMMENTS_RESET,
  GET_ONE_FORUM_COMMENT_START,
  GET_ONE_FORUM_COMMENT_SUCCESS,
  GET_ONE_FORUM_COMMENT_FAILED,
  GET_ONE_FORUM_COMMENT_RESET,
  CREATE_FORUM_COMMENT_START,
  CREATE_FORUM_COMMENT_SUCCESS,
  CREATE_FORUM_COMMENT_FAILED,
  CREATE_FORUM_COMMENT_RESET,
  UPDATE_ONE_FORUM_COMMENT_START,
  UPDATE_ONE_FORUM_COMMENT_SUCCESS,
  UPDATE_ONE_FORUM_COMMENT_FAILED,
  UPDATE_ONE_FORUM_COMMENT_RESET,
  DELETE_ONE_FORUM_COMMENT_START,
  DELETE_ONE_FORUM_COMMENT_SUCCESS,
  DELETE_ONE_FORUM_COMMENT_FAILED,
  DELETE_ONE_FORUM_COMMENT_RESET,
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
  getAllTopicComments: initialLoadingState,
  getOne: initialLoadingState,
  create: initialLoadingState,
  updateOne: initialLoadingState,
  deleteOne: initialLoadingState,
};

const forumCommentsReducer = (state = initialState, action) => {
  switch (action.type) {
    /**
     * =======================================================================
     * Get All Forum Comments
     * =======================================================================
     */
    case GET_ALL_FORUM_COMMENTS_START:
      return { ...state, getAll: { ...action.payload } };
    case GET_ALL_FORUM_COMMENTS_SUCCESS:
      return { ...state, getAll: { ...action.payload } };
    case GET_ALL_FORUM_COMMENTS_FAILED:
      return { ...state, getAll: { ...action.payload } };
    case GET_ALL_FORUM_COMMENTS_RESET:
      return { ...state, getAll: { ...initialLoadingState } };
    /**
     * =======================================================================
     * Get All Topic Comments
     * =======================================================================
     */
    case GET_ALL_TOPIC_COMMENTS_START:
      return { ...state, getAllTopicComments: { ...action.payload } };
    case GET_ALL_TOPIC_COMMENTS_SUCCESS:
      return { ...state, getAllTopicComments: { ...action.payload } };
    case GET_ALL_TOPIC_COMMENTS_FAILED:
      return { ...state, getAllTopicComments: { ...action.payload } };
    case GET_ALL_TOPIC_COMMENTS_RESET:
      return { ...state, getAllTopicComments: { ...initialLoadingState } };
    /**
     * =======================================================================
     * Get One Forum Comment
     * =======================================================================
     */
    case GET_ONE_FORUM_COMMENT_START:
      return { ...state, getOne: { ...action.payload } };
    case GET_ONE_FORUM_COMMENT_SUCCESS:
      return { ...state, getOne: { ...action.payload } };
    case GET_ONE_FORUM_COMMENT_FAILED:
      return { ...state, getOne: { ...action.payload } };
    case GET_ONE_FORUM_COMMENT_RESET:
      return { ...state, getOne: { ...initialLoadingState } };
    /**
     * =======================================================================
     * Create New Forum Comment
     * =======================================================================
     */
    case CREATE_FORUM_COMMENT_START:
      return { ...state, create: { ...action.payload } };
    case CREATE_FORUM_COMMENT_SUCCESS:
      return { ...state, create: { ...action.payload } };
    case CREATE_FORUM_COMMENT_FAILED:
      return { ...state, create: { ...action.payload } };
    case CREATE_FORUM_COMMENT_RESET:
      return { ...state, create: { ...initialLoadingState } };
    /**
     * =======================================================================
     * Update One Forum Comment
     * =======================================================================
     */
    case UPDATE_ONE_FORUM_COMMENT_START:
      return { ...state, updateOne: { ...action.payload } };
    case UPDATE_ONE_FORUM_COMMENT_SUCCESS:
      return { ...state, updateOne: { ...action.payload } };
    case UPDATE_ONE_FORUM_COMMENT_FAILED:
      return { ...state, updateOne: { ...action.payload } };
    case UPDATE_ONE_FORUM_COMMENT_RESET:
      return { ...state, updateOne: { ...initialLoadingState } };
    /**
     * =======================================================================
     * Delete One Forum Comment
     * =======================================================================
     */
    case DELETE_ONE_FORUM_COMMENT_START:
      return { ...state, deleteOne: { ...action.payload } };
    case DELETE_ONE_FORUM_COMMENT_SUCCESS:
      return { ...state, deleteOne: { ...action.payload } };
    case DELETE_ONE_FORUM_COMMENT_FAILED:
      return { ...state, deleteOne: { ...action.payload } };
    case DELETE_ONE_FORUM_COMMENT_RESET:
      return { ...state, deleteOne: { ...initialLoadingState } };
    default:
      return state;
  }
};

export default forumCommentsReducer;
