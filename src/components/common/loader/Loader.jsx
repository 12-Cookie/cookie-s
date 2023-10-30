import { HashLoader } from "react-spinners";

const override = {
  position: "absolute",
  display: "block",
  margin: "0 auto",
  top: "40%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  borderColor: "red",
};

const Loader = ({ loading }) => {
  return (
    <HashLoader
      color="#319795"
      loading={loading}
      cssOverride={override}
      size={100}
      aria-label="Loading Spinner"
      data-testid="loader"
    />
  );
};

export default Loader;
