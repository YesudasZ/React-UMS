import { Spinner } from "react-bootstrap";

const Loader = () => {
  return (
    <Spinner
      animation="border"
      role="status"
      variant="primary"
      style={{
        width: "100px",
        height: "200px",
        margin: "auto",
        display: "block",
        position: "absolute",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
      }}
    ></Spinner>
  );
};

export default Loader;
