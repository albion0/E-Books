// Imports: local files.
import ApiClient from "../../services/ApiClient";

// Action Types: Get All Forum Topics.
export const GET_ALL_FORUM_TOPICS_START = "GET_ALL_FORUM_TOPICS_START";
export const GET_ALL_FORUM_TOPICS_SUCCESS = "GET_ALL_FORUM_TOPICS_SUCCESS";
export const GET_ALL_FORUM_TOPICS_FAILED = "GET_ALL_FORUM_TOPICS_FAILED";
export const GET_ALL_FORUM_TOPICS_RESET = "GET_ALL_FORUM_TOPICS_RESET";

// Action Types: Get One Forum Topics.
export const GET_ONE_FORUM_TOPIC_START = "GET_ONE_FORUM_TOPIC_START";
export const GET_ONE_FORUM_TOPIC_SUCCESS = "GET_ONE_FORUM_TOPIC_SUCCESS";
export const GET_ONE_FORUM_TOPIC_FAILED = "GET_ONE_FORUM_TOPIC_FAILED";
export const GET_ONE_FORUM_TOPIC_RESET = "GET_ONE_FORUM_TOPIC_RESET";

// Action Types: Create New Forum Topics.
export const CREATE_FORUM_TOPIC_START = "CREATE_FORUM_TOPIC_START";
export const CREATE_FORUM_TOPIC_SUCCESS = "CREATE_FORUM_TOPIC_SUCCESS";
export const CREATE_FORUM_TOPIC_FAILED = "CREATE_FORUM_TOPIC_FAILED";
export const CREATE_FORUM_TOPIC_RESET = "CREATE_FORUM_TOPIC_RESET";

// Action Types: Update One Forum Topics.
export const UPDATE_ONE_FORUM_TOPIC_START = "UPDATE_ONE_FORUM_TOPIC_START";
export const UPDATE_ONE_FORUM_TOPIC_SUCCESS = "UPDATE_ONE_FORUM_TOPIC_SUCCESS";
export const UPDATE_ONE_FORUM_TOPIC_FAILED = "UPDATE_ONE_FORUM_TOPIC_FAILED";
export const UPDATE_ONE_FORUM_TOPIC_RESET = "UPDATE_ONE_FORUM_TOPIC_RESET";

// Action Types: Delete One Forum Topics.
export const DELETE_ONE_FORUM_TOPIC_START = "DELETE_ONE_FORUM_TOPIC_START";
export const DELETE_ONE_FORUM_TOPIC_SUCCESS = "DELETE_ONE_FORUM_TOPIC_SUCCESS";
export const DELETE_ONE_FORUM_TOPIC_FAILED = "DELETE_ONE_FORUM_TOPIC_FAILED";
export const DELETE_ONE_FORUM_TOPIC_RESET = "DELETE_ONE_FORUM_TOPIC_RESET";

// Action Creators: Get All Forum Topics.
const getAllForumTopicsStart = (payload) => ({
  type: GET_ALL_FORUM_TOPICS_START,
  payload,
});
const getAllForumTopicsSuccess = (payload) => ({
  type: GET_ALL_FORUM_TOPICS_SUCCESS,
  payload,
});
const getAllForumTopicsFailed = (payload) => ({
  type: GET_ALL_FORUM_TOPICS_FAILED,
  payload,
});
const getAllForumTopicsReset = () => ({ type: GET_ALL_FORUM_TOPICS_RESET });

// Action Creators: Get One Forum Topic.
const getOneForumTopicStart = (payload) => ({
  type: GET_ONE_FORUM_TOPIC_START,
  payload,
});
const getOneForumTopicSuccess = (payload) => ({
  type: GET_ONE_FORUM_TOPIC_SUCCESS,
  payload,
});
const getOneForumTopicFailed = (payload) => ({
  type: GET_ONE_FORUM_TOPIC_FAILED,
  payload,
});
const getOneForumTopicReset = () => ({ type: GET_ONE_FORUM_TOPIC_RESET });

// Action Creators: Create New Forum Topic.
const createForumTopicStart = (payload) => ({
  type: CREATE_FORUM_TOPIC_START,
  payload,
});
const createForumTopicSuccess = (payload) => ({
  type: CREATE_FORUM_TOPIC_SUCCESS,
  payload,
});
const createForumTopicFailed = (payload) => ({
  type: CREATE_FORUM_TOPIC_FAILED,
  payload,
});
const createForumTopicReset = () => ({ type: CREATE_FORUM_TOPIC_RESET });

// Action Creators: Update One Forum Topic.
const updateOneForumTopicStart = (payload) => ({
  type: UPDATE_ONE_FORUM_TOPIC_START,
  payload,
});
const updateOneForumTopicSuccess = (payload) => ({
  type: UPDATE_ONE_FORUM_TOPIC_SUCCESS,
  payload,
});
const updateOneForumTopicFailed = (payload) => ({
  type: UPDATE_ONE_FORUM_TOPIC_FAILED,
  payload,
});
const updateOneForumTopicReset = () => ({
  type: UPDATE_ONE_FORUM_TOPIC_RESET,
});

// Action Creators: Delete One FORUM_TOPIC.
const deleteOneForumTopicStart = (payload) => ({
  type: DELETE_ONE_FORUM_TOPIC_START,
  payload,
});
const deleteOneForumTopicSuccess = (payload) => ({
  type: DELETE_ONE_FORUM_TOPIC_SUCCESS,
  payload,
});
const deleteOneForumTopicFailed = (payload) => ({
  type: DELETE_ONE_FORUM_TOPIC_FAILED,
  payload,
});
const deleteOneForumTopicReset = () => ({
  type: DELETE_ONE_FORUM_TOPIC_RESET,
});

// Actions: Get All Forum Topics.
export const getAllForumTopics = (payload) => {
  return async (dispatch) => {
    dispatch(
      getAllForumTopicsStart({
        loading: true,
        success: false,
        data: null,
        error: false,
        errorMessage: null,
      })
    );

    try {
      const {} = payload;
      const result = await ApiClient.get("forumTopics", {
        params: {},
      });
      if (result.data?.success) {
        const { forumTopics } = result.data.data;
        dispatch(
          getAllForumTopicsSuccess({
            loading: false,
            success: true,
            data: { forumTopics },
            error: false,
            errorMessage: null,
          })
        );
      } else {
        dispatch(
          getAllForumTopicsFailed({
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
        getAllForumTopicsFailed({
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

// Actions: Clear Get All ForumTopics.
export const clearGetAllForumTopics = () => getAllForumTopicsReset();

// Actions: Get One ForumTopic.
export const getOneForumTopic = (payload) => {
  return async (dispatch) => {
    dispatch(
      getOneForumTopicStart({
        loading: true,
        success: false,
        data: null,
        error: false,
        errorMessage: null,
      })
    );

    try {
      const { id } = payload;
      const result = await ApiClient.get(`forumTopics/${id}`);
      if (result.data?.success) {
        const { forumTopic } = result.data.data;
        dispatch(
          getOneForumTopicSuccess({
            loading: false,
            success: true,
            data: { forumTopic },
            error: false,
            errorMessage: null,
          })
        );
      } else {
        dispatch(
          getOneForumTopicFailed({
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
        getOneForumTopicFailed({
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

// Actions: Clear Get One Forum Topic.
export const clearGetOnForumTopicr = () => getOneForumTopicReset();

// Actions: Create New Forum Topic.
export const createForumTopic = (payload, options) => {
  return async (dispatch) => {
    dispatch(
      createForumTopicStart({
        loading: true,
        success: false,
        data: null,
        error: false,
        errorMessage: null,
      })
    );

    const { topic, content } = payload;
    const {
      toastNotification,
      history,
      pathname,
      onSuccessMessage,
      onFailMessage,
    } = options;

    try {
      const result = await ApiClient.post("forumTopics", {
        topic,
        content,
      });
      if (result.data?.success) {
        const { forumTopic } = result.data.data;
        dispatch(
          createForumTopicSuccess({
            loading: false,
            success: true,
            data: { forumTopic },
            error: false,
            errorMessage: null,
          })
        );
        toastNotification("success", onSuccessMessage);
      } else {
        dispatch(
          createForumTopicFailed({
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
        createForumTopicFailed({
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

// Actions: Clear Create New Forum Topic.
export const clearCreateNewForumTopic = () => createForumTopicReset();

// Actions: Update One Forum Topic.
export const updateOneForumTopic = (payload, options) => {
  return async (dispatch) => {
    dispatch(
      updateOneForumTopicStart({
        loading: true,
        success: false,
        data: null,
        error: false,
        errorMessage: null,
      })
    );

    const { id, topic, content } = payload;
    const {
      toastNotification,
      history,
      pathname,
      onSuccessMessage,
      onFailMessage,
    } = options;

    try {
      const result = await ApiClient.put(`forumTopics/${id}`, {
        topic,
        content,
      });
      if (result.data?.success) {
        const { forumTopic } = result.data.data;
        dispatch(
          updateOneForumTopicSuccess({
            loading: false,
            success: true,
            data: { forumTopic },
            error: false,
            errorMessage: null,
          })
        );
        toastNotification("success", onSuccessMessage);
      } else {
        dispatch(
          updateOneForumTopicFailed({
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
        updateOneForumTopicFailed({
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

// Actions: Clear Update One Forum Topic.
export const clearUpdateOneForumTopic = () => updateOneForumTopicReset();

// Actions: Delete One Forum Topic.
export const deleteOneForumTopic = (payload) => {
  return async (dispatch) => {
    dispatch(
      deleteOneForumTopicStart({
        loading: true,
        success: false,
        data: null,
        error: false,
        errorMessage: null,
      })
    );

    try {
      const { id } = payload;
      const result = await ApiClient.delete(`forumTopics/${id}`);
      if (result.data?.success) {
        const { message } = result.data.data;
        dispatch(
          deleteOneForumTopicSuccess({
            loading: false,
            success: true,
            data: { message },
            error: false,
            errorMessage: null,
          })
        );
      } else {
        dispatch(
          deleteOneForumTopicFailed({
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
        deleteOneForumTopicFailed({
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

// Actions: Clear Delete One Forum Topic.
export const cleareDeleteOneForumTopic = () => deleteOneForumTopicReset();
