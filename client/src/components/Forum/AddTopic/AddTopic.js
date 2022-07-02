import { useState, useEffect } from "react";

import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { toastNotification } from "../../../utils/toastNotification";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { Form, Spin } from "antd";
import { LoadingOutlined } from "@ant-design/icons";

import classes from "./AddTopic.module.css";
import { createForumTopic } from "../../../store/actions/actions";

const AddTopic = () => {
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm();

  const createdResponse = useSelector(({ forumTopics }) => forumTopics.create);

  const dispatch = useDispatch();
  const history = useHistory();

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    register("topic", { required: true });
    register("content", {
      required: true,
      validate: (val) => val !== "<p><br></p>",
    });
  }, [register]);

  const onEditorStateChange = (editorState) => setValue("content", editorState);

  const editorContent = watch("content");

  const resetFields = () => {
    setValue("topic", "");
    setValue("content", "");
  };

  const onSubmit = async (data) => {
    const payload = {
      topic: data.topic,
      content: data.content,
    };

    await dispatch(
      createForumTopic(payload, {
        toastNotification,
        history,
        pathname: "/forum",
        onSuccessMessage: "Forum Topic created successfully!",
        onFailMessage: "Failed to create Forum Topic!",
      })
    );

    resetFields();
  };

  useEffect(() => {
    if (createdResponse) {
      switch (true) {
        case createdResponse.loading:
          setLoading(true);
          break;
        case createdResponse.success:
          setLoading(false);
          break;
        case createdResponse.error:
          setLoading(false);
          break;
        default:
          break;
      }
    }
  }, [createdResponse]);

  return (
    <div className={classes.wrapper}>
      <div>
        <h3 style={{ textAlign: "center" }}>Add a topic</h3>
      </div>
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
        <Form
          id="org-form"
          layout="vertical"
          name="basic"
          onFinish={handleSubmit(onSubmit)}
        >
          <div className={classes.title}>
            <p className={classes.fieldTitle}>Topic</p>
            <input
              type="text"
              placeholder="Topic"
              className="form-control"
              id="basic-url"
              onChange={(e) => setValue("topic", e.target.value)}
              aria-describedby="basic-addon3"
              style={{
                fontSize: "15.5px",
                height: "37.5px",
                border: errors.topic ? "1px solid red" : "1px solid #D9D9D9",
                borderRadius: "2px",
              }}
            />
            {errors.topic && (
              <span style={{ color: "red" }}>Topic is required!</span>
            )}
          </div>
          <div className={classes.content}>
            <p
              className={classes.fieldName}
              style={{
                color: errors.content ? "red" : "inherit",
              }}
            >
              {errors.content ? "Content is required" : "Content"}
            </p>
            <ReactQuill
              value={editorContent ? editorContent : ""}
              onChange={(editorState) => onEditorStateChange(editorState)}
              theme="snow"
              style={{ height: "150px" }}
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

          <button
            className={classes.btn}
            type="submit"
            style={{ marginTop: "60px" }}
          >
            Add Topic
          </button>
        </Form>
      )}
    </div>
  );
};

export default AddTopic;
