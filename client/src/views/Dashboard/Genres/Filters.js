import { Row, Col } from "antd";
import { Chip, Stack, Button } from "@mui/material";
import { MinusCircleOutlined } from "@ant-design/icons";

const Filters = ({ handleSearchChange, handleReset }) => {
  return (
    <Row
      xs={24}
      sm={24}
      md={24}
      lg={24}
      className="mb-3"
      style={{ rowGap: "20px", columnGap: "20px" }}
    >
      <Col xs={24} sm={24} md={5} lg={5} className="mr-2">
        <div style={{ width: "100%" }}>
          <input
            type="text"
            placeholder="Filter by Name"
            className="form-control"
            id="basic-url"
            onBlur={(e) => handleSearchChange(e.target.value)}
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
