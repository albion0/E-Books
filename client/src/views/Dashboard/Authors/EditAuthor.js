import React, { useEffect, useState } from "react";
import { Drawer, Form, Button, Row, DatePicker, Spin } from "antd";
import {
  LoadingOutlined,
  PlusOutlined,
  MinusOutlined,
} from "@ant-design/icons";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { useForm } from "react-hook-form";
import { useHistory } from "react-router";
import { toastNotification } from "../../../utils/toastNotification";
import { useSelector, useDispatch } from "react-redux";
import { getOneAuthor, updateOneAuthor } from "../../../store/actions/actions";
import moment from "moment";

const getLoadingIndicator = (handleModal, visible) => {
  return (
    <Drawer
      title="Edit Author"
      width={500}
      onClose={handleModal}
      visible={visible}
      destroyOnClose={true}
      footer={
        <div
          style={{
            textAlign: "right",
          }}
        >
          <Button onClick={handleModal} style={{ marginRight: 8 }}>
            Cancel
          </Button>
          <Button type="primary" form="org-form" key="submit" htmlType="submit">
            Submit
          </Button>
        </div>
      }
    >
      <Spin
        indicator={<LoadingOutlined style={{ fontSize: 100 }} spin />}
        style={{ position: "absolute", top: "40%", left: "40%" }}
      />
    </Drawer>
  );
};

export const EditAuthor = ({
  visible,
  recallAllAuthors,
  handleModal,
  authorId,
}) => {
  const {
    register,
    handleSubmit,
    setValue,
    getValues,
    watch,
    formState: { errors },
  } = useForm();

  const getOneResponse = useSelector(({ authors }) => authors.getOne);

  const [isLoading, setIsLoading] = useState(false);

  const dispatch = useDispatch();
  const history = useHistory();

  useEffect(() => {
    register("name", { required: true });
    register("description", {
      required: true,
      validate: (val) => val !== "<p><br></p>",
    });
  }, [register]);

  const onEditorStateChange = (editorState) =>
    setValue("description", editorState);

  const editorContent = watch("description");

  useEffect(() => {
    dispatch(getOneAuthor({ authorId }));
  }, []);

  useEffect(() => {
    if (getOneResponse && getOneResponse.loading) {
      setIsLoading(true);
    } else if (getOneResponse && getOneResponse.success) {
      setIsLoading(false);

      const { author } = getOneResponse.data;

      setValue("name", author.name);
      setValue("description", author.description);
    } else if (getOneResponse && getOneResponse.error) {
      setIsLoading(false);
    }
  }, [getOneResponse]);

  const onSubmit = async (data) => {
    const payload = {
      authorId: authorId,
      name: data.name,
      description: data.description,
    };

    await dispatch(
      updateOneAuthor(payload, {
        showToast: true,
        toastNotification,
        history,
        pathname: null,
        onSuccessMessage: "Author updated succesfully!",
        onFailMessage: "Failed to update Author!",
      })
    );
    recallAllAuthors();
    handleModal();
  };

  if (isLoading) return getLoadingIndicator(handleModal, visible);
  return (
    <div>
      <Drawer
        title="Edit Author"
        width={500}
        onClose={handleModal}
        visible={visible}
        destroyOnClose={true}
        footer={
          <div
            style={{
              textAlign: "right",
            }}
          >
            <Button onClick={handleModal} style={{ marginRight: 8 }}>
              Cancel
            </Button>
            <Button
              type="primary"
              form="org-form"
              key="submit"
              htmlType="submit"
            >
              Submit
            </Button>
          </div>
        }
      >
        <Form
          id="org-form"
          layout="vertical"
          name="basic"
          onFinish={handleSubmit(onSubmit)}
        >
          <Row style={{ marginTop: "5px" }}>
            <div style={{ width: "100%" }}>
              <span
                className="input-group-text"
                id="basic-addon3"
                style={{
                  fontSize: "15.5px",
                  backgroundColor: "transparent",
                  border: "none",
                }}
              >
                Name
              </span>
              <input
                type="text"
                placeholder="Name"
                className="form-control"
                id="basic-url"
                defaultValue={getValues("name") || ""}
                onChange={(e) => setValue("name", e.target.value)}
                aria-describedby="basic-addon3"
                style={{
                  fontSize: "15.5px",
                  height: "37.5px",
                  border: errors.name ? "1px solid red" : "1px solid #D9D9D9",
                  borderRadius: "2px",
                }}
              />
              {errors.name && (
                <span style={{ color: "red" }}>Name is required!</span>
              )}
            </div>
          </Row>
          <Row style={{ marginTop: "5px" }}>
            <div style={{ width: "100%" }}>
              <span
                className="input-group-text"
                id="basic-addon3"
                style={{
                  fontSize: "15.5px",
                  backgroundColor: "transparent",
                  border: "none",
                  paddingTop: "15px",
                  color: errors.description ? "red" : "inherit",
                }}
              >
                {errors.description
                  ? "Description is required!"
                  : "Description"}
              </span>

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
          </Row>
        </Form>
      </Drawer>
    </div>
  );
};
