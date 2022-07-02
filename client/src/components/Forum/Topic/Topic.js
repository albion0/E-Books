import { useEffect, useState } from "react";
import { TablePagination } from "@mui/material";

import User from "./User/User";
import Replies from "./Replies/Replies";
import AddReply from "./AddReply/AddReply";

import classes from "./Topic.module.css";
import { Redirect, useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  getOneForumTopic,
  getAllTopicComments,
  createForumComment,
  clearGetOneForumTopic,
  clearGetAllTopicComments,
  clearCreateNewForumComment,
} from "../../../store/actions/actions";
import { Spin, Form } from "antd";
import { LoadingOutlined } from "@ant-design/icons";
import moment from "moment";
import { useForm } from "react-hook-form";
import { toastNotification } from "../../../utils/toastNotification";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import Reply from "./Replies/Reply/Reply";

const Topic = (props) => {
  const id = props.match.params.id;

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm();

  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalItems, setTotalItems] = useState(100);
  const [loading, setLoading] = useState(true);
  const [commentsLoading, setCommentsLoading] = useState(true);
  const [localForumTopic, setLocalForumTopic] = useState({});
  const [localComments, setLocalComments] = useState([]);

  const dispatch = useDispatch();
  const history = useHistory();

  const getOneResponse = useSelector(({ forumTopics }) => forumTopics.getOne);
  const allCommentsResponse = useSelector(
    ({ forumComments }) => forumComments.getAllTopicComments
  );
  const createdCommentResponse = useSelector(
    ({ forumComments }) => forumComments.create
  );

  useEffect(() => {
    return () => {
      dispatch(clearGetOneForumTopic());
      dispatch(clearGetAllTopicComments());
      dispatch(clearCreateNewForumComment());
    };
  }, []);

  useEffect(() => {
    dispatch(getOneForumTopic({ id }));
    dispatch(getAllTopicComments({ id }));
  }, []);

  useEffect(() => {
    if (getOneResponse) {
      switch (true) {
        case getOneResponse.loading:
          setLoading(true);
          break;
        case getOneResponse.success:
          const { forumTopic } = getOneResponse.data;
          setLocalForumTopic(forumTopic);
          setLoading(false);
          break;
        case getOneResponse.error:
          setLoading(false);
          break;
        default:
          break;
      }
    }
  }, [getOneResponse]);

  useEffect(() => {
    register("text", {
      required: true,
      validate: (val) => val !== "<p><br></p>",
    });
  }, [register]);

  const onEditorStateChange = (editorState) => setValue("text", editorState);

  const editorContent = watch("text");

  const resetFields = () => {
    setValue("text", "");
  };

  const onSubmit = async (data) => {
    const payload = {
      ForumTopicId: id,
      text: data.text,
    };

    await dispatch(
      createForumComment(payload, {
        toastNotification,
        history,
        pathname: null,
        onSuccessMessage: "Forum Comment created successfully!",
        onFailMessage: "Failed to create Forum Comment!",
      })
    );

    resetFields();
  };

  useEffect(() => {
    if (allCommentsResponse) {
      switch (true) {
        case allCommentsResponse.loading:
          setCommentsLoading(true);
          break;
        case allCommentsResponse.success:
          const { forumComments } = allCommentsResponse.data;
          setLocalComments(forumComments);
          setCommentsLoading(false);
          break;
        case allCommentsResponse.error:
          setCommentsLoading(false);
          break;
        default:
          break;
      }
    }
  }, [allCommentsResponse]);

  useEffect(() => {
    if (createdCommentResponse) {
      switch (true) {
        case createdCommentResponse.loading:
          break;
        case createdCommentResponse.success:
          recallComments();
          break;
        case createdCommentResponse.error:
          break;
        default:
          break;
      }
    }
  }, [createdCommentResponse]);

  const recallComments = () => {
    dispatch(getAllTopicComments({ id }));
  };

  if (!id) return <Redirect to="/" />;
  return (
    <div className={classes.wrapper}>
      {loading ? (
        <div
          className="d-flex justify-content-center"
          style={{ marginTop: "100px" }}
        >
          <Spin
            indicator={<LoadingOutlined style={{ fontSize: 100 }} spin />}
          />
        </div>
      ) : (
        <>
          <div className={classes.topic}>
            <User forumTopic={localForumTopic} />
            <div className={classes.content}>
              <p
                className={classes.text}
                dangerouslySetInnerHTML={{ __html: localForumTopic.content }}
              ></p>

              <p className={classes.date}>
                {" "}
                {moment(localForumTopic.createdAt).format(
                  "dddd, MMMM Do YYYY, h:mm:ss a"
                )}
              </p>
            </div>
          </div>

          <Form
            id="org-form"
            layout="vertical"
            name="basic"
            onFinish={handleSubmit(onSubmit)}
            style={{ marginBottom: "30px" }}
          >
            <div className={classes.content} style={{ marginTop: "30px" }}>
              <p
                className={classes.fieldName}
                style={{
                  color: errors.text ? "red" : "inherit",
                }}
              >
                {errors.text ? "Comment is required" : "Comment"}
              </p>
              <ReactQuill
                value={editorContent ? editorContent : ""}
                onChange={(editorState) => onEditorStateChange(editorState)}
                theme="snow"
                modules={{
                  toolbar: [
                    [{ header: [1, 2, 3, 4, 5, 6] }],
                    ["bold", "italic", "underline", "strike", "blockquote"],
                    [
                      { list: "ordered" },
                      { list: "bullet" },
                      { indent: "-1" },
                      { indent: "+1" },
                    ],
                    ["link", "image"],
                    ["clean"],
                  ],
                }}
              />
            </div>

            <div className={classes.buttons}>
              <button className={classes.submitBtn} type="submit">
                Submit
              </button>
            </div>
          </Form>

          {commentsLoading ? (
            <div
              className="d-flex justify-content-center"
              style={{ marginTop: "50px" }}
            >
              <Spin
                indicator={<LoadingOutlined style={{ fontSize: 100 }} spin />}
              />
            </div>
          ) : (
            localComments &&
            localComments.map((comment) => <Reply forumComment={comment} />)
          )}
        </>
      )}
    </div>
  );
};

export default Topic;
