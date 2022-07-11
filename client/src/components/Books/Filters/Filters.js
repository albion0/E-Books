import classes from "./Filters.module.css";
import { Row, Col } from "antd";
import { Chip, Stack, Button } from "@mui/material";
import { MinusCircleOutlined } from "@ant-design/icons";

const Filters = ({
  bookName,
  handleSearchChange,
  onAuthorChange,
  selectedAuthor,
  authorsResponse,
  authorChips,
  onGenreChange,
  genresResponse,
  selectedGenre,
  genreChips,
  handleCreditsChange,
  handleReset,
}) => {
  return (
    <Row
      xs={24}
      sm={24}
      md={24}
      lg={24}
      className="mt-5 mb-5"
      style={{ rowGap: "20px", columnGap: "20px" }}
    >
      <Col xs={24} sm={24} md={5} lg={5} className="mr-2">
        <div style={{ width: "100%" }}>
          <input
            type="text"
            placeholder="Filter by title"
            className="form-control"
            id="basic-url"
            onBlur={(e) => handleSearchChange("bookName", e.target.value)}
            defaultValue={bookName || ""}
            aria-describedby="basic-addon3"
            style={{
              fontSize: "15.5px",
              height: "37.5px",
              outline: "none",
            }}
          />
        </div>
      </Col>
      <Col xs={24} sm={24} md={5} lg={5} className="mr-2">
        <div style={{ width: "100%" }}>
          <select
            className="form-control"
            defaultValue="choose"
            onChange={(e) => onAuthorChange(JSON.parse(e.target.value), "add")}
          >
            <option
              disabled
              value="choose"
              selected={selectedAuthor === "choose"}
            >
              Filter by Authors
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
                    onDelete={() => onAuthorChange(chip, "delete")}
                  />
                );
              })}
          </div>
        </div>
      </Col>
      <Col xs={24} sm={24} md={5} lg={5} className="mr-2">
        <div style={{ width: "100%" }}>
          <select
            className="form-control"
            defaultValue="choose"
            onChange={(e) => onGenreChange(JSON.parse(e.target.value), "add")}
          >
            <option
              disabled
              value="choose"
              selected={selectedGenre === "choose"}
            >
              Filter by Genres
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
              genreChips.map((chip) => {
                const name = chip.name;
                return (
                  <Chip
                    style={{ margin: 3 }}
                    key={chip._id}
                    label={name}
                    variant="outlined"
                    onDelete={() => onGenreChange(chip, "delete")}
                  />
                );
              })}
          </div>
        </div>
      </Col>
      <Col xs={24} sm={24} md={5} lg={5} className="mr-2">
        <div style={{ width: "100%" }}>
          <input
            type="text"
            placeholder="Filter by credits"
            className="form-control"
            id="basic-url"
            onBlur={(e) => handleCreditsChange("credits", e.target.value)}
            aria-describedby="basic-addon3"
            style={{
              fontSize: "15.5px",
              height: "37.5px",
              outline: "none",
            }}
          />
        </div>
      </Col>
      <Col
        xs={24}
        sm={24}
        md={2}
        lg={2}
        className="d-flex justify-content-center"
        style={{ height: "43px" }}
      >
        <Button
          onClick={handleReset}
          style={{
            width: "100%",
            height: "90%",
            color: "white",
            backgroundColor: "lightgray",
          }}
        >
          <MinusCircleOutlined
            style={{ paddingBottom: "3px", paddingRight: "5px" }}
          />{" "}
          Reset
        </Button>
      </Col>
    </Row>
  );
};

export default Filters;
