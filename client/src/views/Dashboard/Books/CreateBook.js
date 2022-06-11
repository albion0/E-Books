import React, { useEffect, useState } from "react";
import { Drawer, Form, Button, Row, Upload } from "antd";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { useForm } from "react-hook-form";
import { useHistory } from "react-router";
import { toastNotification } from "../../../utils/toastNotification";
import { useSelector, useDispatch } from "react-redux";
import {
  getAllAuthors,
  getAllGenres,
  createBook,
  uploadPhotoBook,
  clearCreateNewBook,
  clearUploadPhotoBook,
} from "../../../store/actions/actions";
import { Chip } from "@mui/material";
import { PlusOutlined, MinusOutlined, UploadOutlined } from "@ant-design/icons";
import { v4 as uuidv4 } from "uuid";

export const CreateBook = ({ visible, recallAllBooks, handleModal }) => {
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm();

  const authorsResponse = useSelector(({ authors }) => authors.getAll);
  const genresResponse = useSelector(({ genres }) => genres.getAll);
  const createdBookResponse = useSelector(({ books }) => books.create);

  const [selectedAuthor, setSelectedAuthor] = useState("choose");
  const [selectedGenre, setSelectedGenre] = useState("choose");
  const [authorChips, setAuthorChips] = useState([]);
  const [genreChips, setGenreChips] = useState([]);
  const [uploadedFile, setUploadedFile] = useState(null);

  const dispatch = useDispatch();
  const history = useHistory();

  useEffect(() => {
    return () => {
      dispatch(clearCreateNewBook());
      dispatch(clearUploadPhotoBook());
    };
  }, []);

  useEffect(async () => {
    if (createdBookResponse && createdBookResponse.success) {
      const { book } = createdBookResponse.data;

      const formData = new FormData();
      formData.append("bookPhoto", uploadedFile);

      await dispatch(
        uploadPhotoBook(
          { bookId: book._id, formData },
          {
            showToast: true,
            toastNotification,
            history,
            pathname: null,
            onSuccessMessage: "Book created successfully!",
            onFailMessage: "Failed to create book!",
          }
        )
      );

      resetFields();
      recallAllBooks();
      handleModal();
    }
  }, [createdBookResponse]);

  useEffect(() => {
    register("title", { required: true });
    register("content", {
      required: true,
      validate: (val) => val !== "<p><br></p>",
    });
    register("authors", {
      required: true,
      validate: (val) => val !== "choose" && Array.isArray(val) && val.length,
    });
    register("genres", {
      required: true,
      validate: (val) => val !== "choose" && Array.isArray(val) && val.length,
    });
    register("credits", { required: true });
  }, [register]);

  const onEditorStateChange = (editorState) => setValue("content", editorState);

  const editorContent = watch("content");

  useEffect(() => {
    dispatch(getAllAuthors({ pagination: false }));
    dispatch(getAllGenres({ pagination: false }));
  }, []);

  const resetFields = () => {
    setValue("title", "");
    setValue("content", "");
    setValue("authors", []);
    setValue("genres", []);
    setValue("credits", "");
  };

  const onAuthorsChange = (author, type) => {
    switch (type) {
      case "add":
        const exists = authorChips.find((chip) => chip._id === author._id);
        if (exists) return;

        const addedArray = [...authorChips, author];
        setAuthorChips(addedArray);
        setValue("authors", addedArray);
        setSelectedAuthor(author._id);
        break;
      case "delete":
        const filteredArray = authorChips.filter(
          (chip) => chip._id !== author._id
        );
        setAuthorChips(filteredArray);
        setValue("authors", filteredArray);
        setSelectedAuthor("choose");
        break;
      default:
        break;
    }
  };
  const onGenresChange = (genre, type) => {
    switch (type) {
      case "add":
        const exists = genreChips.find((chip) => chip._id === genre._id);
        if (exists) return;

        const addedArray = [...genreChips, genre];
        setGenreChips(addedArray);
        setValue("genres", addedArray);
        setSelectedGenre(genre._id);
        break;
      case "delete":
        const filteredArray = genreChips.filter(
          (chip) => chip._id !== genre._id
        );
        setGenreChips(filteredArray);
        setValue("genres", filteredArray);
        setSelectedGenre("choose");
        break;
      default:
        break;
    }
  };

  const onSubmit = async (data) => {
    if (!uploadedFile) {
      toastNotification("error", "Book photo must be uploaded!");
      return;
    }
    const payload = {
      title: data.title,
      content: data.content,
      authors: data.authors.map((aut) => aut._id),
      genres: data.genres.map((gen) => gen._id),
      credits: data.credits,
    };

    await dispatch(
      createBook(payload, {
        showToast: false,
        toastNotification,
        history,
        pathname: null,
        onSuccessMessage: "Book created successfully!",
        onFailMessage: "Failed to create book!",
      })
    );

    resetFields();
    setAuthorChips([]);
    setGenreChips([]);
    recallAllBooks();
    handleModal();
  };

  const handleUploadChange = ({ file }) => {
    file ? setUploadedFile(file) : setUploadedFile(null);
    file && toastNotification("success", "Photo uploaded successfully!");
  };

  return (
    <div>
      <Drawer
        title="Create Book"
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
                Title
              </span>
              <input
                type="text"
                placeholder="Title"
                className="form-control"
                id="basic-url"
                onChange={(e) => setValue("title", e.target.value)}
                aria-describedby="basic-addon3"
                style={{
                  fontSize: "15.5px",
                  height: "37.5px",
                  border: errors.title ? "1px solid red" : "1px solid #D9D9D9",
                  borderRadius: "2px",
                }}
              />
              {errors.title && (
                <span style={{ color: "red" }}>Title is required!</span>
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
                  color: errors.content ? "red" : "inherit",
                }}
              >
                {errors.content ? "Content is required!" : "Content"}
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
          <Row style={{ marginTop: "75px" }}>
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
                Authors
              </span>
              <select
                className="form-control"
                defaultValue="choose"
                onChange={(e) =>
                  onAuthorsChange(JSON.parse(e.target.value), "add")
                }
              >
                <option
                  disabled
                  value="choose"
                  selected={selectedAuthor === "choose"}
                >
                  Select Author
                </option>
                {authorsResponse.success &&
                  authorsResponse.data &&
                  authorsResponse.data.authors.docs.map((author) => {
                    return (
                      <option
                        key={author._id}
                        value={JSON.stringify(author)}
                        selected={author._id === selectedAuthor}
                      >
                        {author.name}
                      </option>
                    );
                  })}
              </select>

              <div style={{ marginTop: "5px" }}>
                {authorChips &&
                  authorChips.map((chip) => {
                    const name = chip.name;
                    return (
                      <Chip
                        style={{ margin: 3 }}
                        key={chip._id}
                        label={name}
                        variant="outlined"
                        onDelete={() => onAuthorsChange(chip, "delete")}
                      />
                    );
                  })}
              </div>
              {errors.authors && (
                <span style={{ color: "red" }}>Author/s is/are required!</span>
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
                }}
              >
                Genres
              </span>
              <select
                className="form-control"
                defaultValue="choose"
                onChange={(e) =>
                  onGenresChange(JSON.parse(e.target.value), "add")
                }
              >
                <option
                  disabled
                  value="choose"
                  selected={selectedGenre === "choose"}
                >
                  Choose Genre
                </option>
                {genresResponse.success &&
                  genresResponse.data &&
                  genresResponse.data.genres.docs.map((genre) => {
                    return (
                      <option
                        key={genre._id}
                        value={JSON.stringify(genre)}
                        selected={genre._id === selectedGenre}
                      >
                        {genre.name}
                      </option>
                    );
                  })}
              </select>

              <div style={{ marginTop: "5px" }}>
                {genreChips &&
                  genreChips.map((genre) => {
                    const name = genre.name;
                    return (
                      <Chip
                        style={{ margin: 3 }}
                        key={genre._id}
                        label={name}
                        variant="outlined"
                        onDelete={() => onGenresChange(genre, "delete")}
                      />
                    );
                  })}
              </div>
              {errors.genres && (
                <span style={{ color: "red" }}>Genre/s is/are required!</span>
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
                }}
              >
                Credits
              </span>
              <input
                type="text"
                placeholder="Credits"
                className="form-control"
                id="basic-url"
                onChange={(e) => setValue("credits", e.target.value)}
                aria-describedby="basic-addon3"
                style={{
                  fontSize: "15.5px",
                  height: "37.5px",
                  border: errors.credits
                    ? "1px solid red"
                    : "1px solid #D9D9D9",
                  borderRadius: "2px",
                }}
              />
              {errors.credits && (
                <span style={{ color: "red" }}>Credits is required!</span>
              )}
            </div>
          </Row>
          <Row style={{ marginTop: "25px" }} xs={24} sm={24} md={24} lg={24}>
            <Form.Item
              name="bookPhoto"
              style={{
                paddingTop: "20px",
                display: "flex",
                flexDirection: "column",
                width: "100%",
              }}
            >
              <Upload
                accept=".png, .jpeg, .jpg"
                beforeUpload={() => false}
                name="image"
                maxCount={1}
                listType="picture"
                onChange={handleUploadChange}
              >
                <Button icon={<UploadOutlined />}>Book Photo</Button>
              </Upload>
            </Form.Item>
            {/* <Upload
              accept=".png, .jpeg, .jpg"
              beforeUpload={() => false}
              name="image"
              maxCount={1}
              listType="picture"
              onChange={handleUploadChange}
            >
              <Button icon={<UploadOutlined />}>Book Photo</Button>
            </Upload> */}
          </Row>
        </Form>
      </Drawer>
    </div>
  );
};
