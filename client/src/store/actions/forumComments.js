// Imports: local files.
import ApiClient from "../../services/ApiClient";

// Action Types: Get All Forum Comments.
export const GET_ALL_FORUM_COMMENTS_START = "GET_ALL_FORUM_COMMENTS_START";
export const GET_ALL_FORUM_COMMENTS_SUCCESS = "GET_ALL_FORUM_COMMENTS_SUCCESS";
export const GET_ALL_FORUM_COMMENTS_FAILED = "GET_ALL_FORUM_COMMENTS_FAILED";
export const GET_ALL_FORUM_COMMENTS_RESET = "GET_ALL_FORUM_COMMENTS_RESET";

// Action Types: Get All Topic Comments.
export const GET_ALL_TOPIC_COMMENTS_START = "GET_ALL_TOPIC_COMMENTS_START";
export const GET_ALL_TOPIC_COMMENTS_SUCCESS = "GET_ALL_TOPIC_COMMENTS_SUCCESS";
export const GET_ALL_TOPIC_COMMENTS_FAILED = "GET_ALL_TOPIC_COMMENTS_FAILED";
export const GET_ALL_TOPIC_COMMENTS_RESET = "GET_ALL_TOPIC_COMMENTS_RESET";

// Action Types: Get One Forum Comments.
export const GET_ONE_FORUM_COMMENT_START = "GET_ONE_FORUM_COMMENT_START";
export const GET_ONE_FORUM_COMMENT_SUCCESS = "GET_ONE_FORUM_COMMENT_SUCCESS";
export const GET_ONE_FORUM_COMMENT_FAILED = "GET_ONE_FORUM_COMMENT_FAILED";
export const GET_ONE_FORUM_COMMENT_RESET = "GET_ONE_FORUM_COMMENT_RESET";

// Action Types: Create New Forum Comments.
export const CREATE_FORUM_COMMENT_START = "CREATE_FORUM_COMMENT_START";
export const CREATE_FORUM_COMMENT_SUCCESS = "CREATE_FORUM_COMMENT_SUCCESS";
export const CREATE_FORUM_COMMENT_FAILED = "CREATE_FORUM_COMMENT_FAILED";
export const CREATE_FORUM_COMMENT_RESET = "CREATE_FORUM_COMMENT_RESET";

// Action Types: Update One Forum Comments.
export const UPDATE_ONE_FORUM_COMMENT_START = "UPDATE_ONE_FORUM_COMMENT_START";
export const UPDATE_ONE_FORUM_COMMENT_SUCCESS =
  "UPDATE_ONE_FORUM_COMMENT_SUCCESS";
export const UPDATE_ONE_FORUM_COMMENT_FAILED =
  "UPDATE_ONE_FORUM_COMMENT_FAILED";
export const UPDATE_ONE_FORUM_COMMENT_RESET = "UPDATE_ONE_FORUM_COMMENT_RESET";

// Action Types: Delete One Forum Comments.
export const DELETE_ONE_FORUM_COMMENT_START = "DELETE_ONE_FORUM_COMMENT_START";
export const DELETE_ONE_FORUM_COMMENT_SUCCESS =
  "DELETE_ONE_FORUM_COMMENT_SUCCESS";
export const DELETE_ONE_FORUM_COMMENT_FAILED =
  "DELETE_ONE_FORUM_COMMENT_FAILED";
export const DELETE_ONE_FORUM_COMMENT_RESET = "DELETE_ONE_FORUM_COMMENT_RESET";

// Action Creators: Get All Forum Comments.
const getAllForumCommentsStart = (payload) => ({
  type: GET_ALL_FORUM_COMMENTS_START,
  payload,
});
const getAllForumCommentsSuccess = (payload) => ({
  type: GET_ALL_FORUM_COMMENTS_SUCCESS,
  payload,
});
const getAllForumCommentsFailed = (payload) => ({
  type: GET_ALL_FORUM_COMMENTS_FAILED,
  payload,
});
const getAllForumCommentsReset = () => ({ type: GET_ALL_FORUM_COMMENTS_RESET });

// Action Creators: Get All Topic Comments.
const getAllTopicCommentsStart = (payload) => ({
  type: GET_ALL_TOPIC_COMMENTS_START,
  payload,
});
const getAllTopicCommentsSuccess = (payload) => ({
  type: GET_ALL_TOPIC_COMMENTS_SUCCESS,
  payload,
});
const getAllTopicCommentsFailed = (payload) => ({
  type: GET_ALL_TOPIC_COMMENTS_FAILED,
  payload,
});
const getAllTopicCommentsReset = () => ({ type: GET_ALL_TOPIC_COMMENTS_RESET });

// Action Creators: Get One Forum Comment.
const getOneForumCommentStart = (payload) => ({
  type: GET_ONE_FORUM_COMMENT_START,
  payload,
});
const getOneForumCommentSuccess = (payload) => ({
  type: GET_ONE_FORUM_COMMENT_SUCCESS,
  payload,
});
const getOneForumCommentFailed = (payload) => ({
  type: GET_ONE_FORUM_COMMENT_FAILED,
  payload,
});
const getOneForumCommentReset = () => ({ type: GET_ONE_FORUM_COMMENT_RESET });

// Action Creators: Create New Forum Comment.
const createForumCommentStart = (payload) => ({
  type: CREATE_FORUM_COMMENT_START,
  payload,
});
const createForumCommentSuccess = (payload) => ({
  type: CREATE_FORUM_COMMENT_SUCCESS,
  payload,
});
const createForumCommentFailed = (payload) => ({
  type: CREATE_FORUM_COMMENT_FAILED,
  payload,
});
const createForumCommentReset = () => ({ type: CREATE_FORUM_COMMENT_RESET });

// Action Creators: Update One Forum Comment.
const updateOneForumCommentStart = (payload) => ({
  type: UPDATE_ONE_FORUM_COMMENT_START,
  payload,
});
const updateOneForumCommentSuccess = (payload) => ({
  type: UPDATE_ONE_FORUM_COMMENT_SUCCESS,
  payload,
});
const updateOneForumCommentFailed = (payload) => ({
  type: UPDATE_ONE_FORUM_COMMENT_FAILED,
  payload,
});
const updateOneForumCommentReset = () => ({
  type: UPDATE_ONE_FORUM_COMMENT_RESET,
});

// Action Creators: Delete One Forum Comment.
const deleteOneForumCommentStart = (payload) => ({
  type: DELETE_ONE_FORUM_COMMENT_START,
  payload,
});
const deleteOneForumCommentSuccess = (payload) => ({
  type: DELETE_ONE_FORUM_COMMENT_SUCCESS,
  payload,
});
const deleteOneForumCommentFailed = (payload) => ({
  type: DELETE_ONE_FORUM_COMMENT_FAILED,
  payload,
});
const deleteOneForumCommentReset = () => ({
  type: DELETE_ONE_FORUM_COMMENT_RESET,
});

// Actions: Get All Forum Comment.
export const getAllForumComments = (payload) => {
  return async (dispatch) => {
    dispatch(
      getAllForumCommentsStart({
        loading: true,
        success: false,
        data: null,
        error: false,
        errorMessage: null,
      })
    );

    try {
      const {} = payload;
      const result = await ApiClient.get("forumComments", {
        params: {},
      });
      if (result.data?.success) {
        const { forumComments } = result.data.data;
        dispatch(
          getAllForumCommentsSuccess({
            loading: false,
            success: true,
            data: { forumComments },
            error: false,
            errorMessage: null,
          })
        );
      } else {
        dispatch(
          getAllForumCommentsFailed({
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
        getAllForumCommentsFailed({
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

// Actions: Clear Get All Forum Comment.
export const clearGetAllForumComments = () => getAllForumCommentsReset();

// Actions: Get All Topic Comment.
export const getAllTopicComments = (payload) => {
  return async (dispatch) => {
    dispatch(
      getAllTopicCommentsStart({
        loading: true,
        success: false,
        data: null,
        error: false,
        errorMessage: null,
      })
    );

    try {
      const { id } = payload;
      const result = await ApiClient.get("forumComments/comments", {
        params: { id },
      });
      if (result.data?.success) {
        const { forumComments } = result.data.data;
        dispatch(
          getAllTopicCommentsSuccess({
            loading: false,
            success: true,
            data: { forumComments },
            error: false,
            errorMessage: null,
          })
        );
      } else {
        dispatch(
          getAllTopicCommentsFailed({
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
        getAllTopicCommentsFailed({
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

// Actions: Clear Get All Topic Comment.
export const clearGetAllTopicComments = () => getAllTopicCommentsReset();

// Actions: Get One Forum Comment.
export const getOneForumComment = (payload) => {
  return async (dispatch) => {
    dispatch(
      getOneForumCommentStart({
        loading: true,
        success: false,
        data: null,
        error: false,
        errorMessage: null,
      })
    );

    try {
      const { id } = payload;
      const result = await ApiClient.get(`forumComments/${id}`);
      if (result.data?.success) {
        const { forumComment } = result.data.data;
        dispatch(
          getOneForumCommentSuccess({
            loading: false,
            success: true,
            data: { forumComment },
            error: false,
            errorMessage: null,
          })
        );
      } else {
        dispatch(
          getOneForumCommentFailed({
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
        getOneForumCommentFailed({
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

// Actions: Clear Get One Forum Comment.
export const clearGetOnForumCommentr = () => getOneForumCommentReset();

// Actions: Create New Forum Comment.
export const createForumComment = (payload, options) => {
  return async (dispatch) => {
    dispatch(
      createForumCommentStart({
        loading: true,
        success: false,
        data: null,
        error: false,
        errorMessage: null,
      })
    );

    const { text, ForumTopicId } = payload;
    const {
      toastNotification,
      history,
      pathname,
      onSuccessMessage,
      onFailMessage,
    } = options;

    try {
      const result = await ApiClient.post("forumComments", {
        text,
        ForumTopicId,
      });
      if (result.data?.success) {
        const { forumComment } = result.data.data;
        dispatch(
          createForumCommentSuccess({
            loading: false,
            success: true,
            data: { forumComment },
            error: false,
            errorMessage: null,
          })
        );
        toastNotification("success", onSuccessMessage);
      } else {
        dispatch(
          createForumCommentFailed({
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
        createForumCommentFailed({
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

// Actions: Clear Create New Forum Comment.
export const clearCreateNewForumComment = () => createForumCommentReset();

// Actions: Update One Forum Comment.
export const updateOneForumComment = (payload, options) => {
  return async (dispatch) => {
    dispatch(
      updateOneForumCommentStart({
        loading: true,
        success: false,
        data: null,
        error: false,
        errorMessage: null,
      })
    );

    const { id, text, ForumTopicId } = payload;
    const {
      toastNotification,
      history,
      pathname,
      onSuccessMessage,
      onFailMessage,
    } = options;

    try {
      const result = await ApiClient.put(`forumComments/${id}`, {
        text,
        ForumTopicId,
      });
      if (result.data?.success) {
        const { forumComment } = result.data.data;
        dispatch(
          updateOneForumCommentSuccess({
            loading: false,
            success: true,
            data: { forumComment },
            error: false,
            errorMessage: null,
          })
        );
        toastNotification("success", onSuccessMessage);
      } else {
        dispatch(
          updateOneForumCommentFailed({
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
        updateOneForumCommentFailed({
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

// Actions: Clear Update One Forum Comment.
export const clearUpdateOneForumComment = () => updateOneForumCommentReset();

// Actions: Delete One Forum Comment.
export const deleteOneForumComment = (payload) => {
  return async (dispatch) => {
    dispatch(
      deleteOneForumCommentStart({
        loading: true,
        success: false,
        data: null,
        error: false,
        errorMessage: null,
      })
    );

    try {
      const { id } = payload;
      const result = await ApiClient.delete(`forumComments/${id}`);
      if (result.data?.success) {
        const { message } = result.data.data;
        dispatch(
          deleteOneForumCommentSuccess({
            loading: false,
            success: true,
            data: { message },
            error: false,
            errorMessage: null,
          })
        );
      } else {
        dispatch(
          deleteOneForumCommentFailed({
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
        deleteOneForumCommentFailed({
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

// Actions: Clear Delete One Forum Comment.
export const cleareDeleteOneForumComment = () => deleteOneForumCommentReset();
