/* eslint-disable react/prop-types */
import ArrowCircleLeftIcon from "@mui/icons-material/ArrowCircleLeft";

const PrevArrow = ({ onClick, visible }) => {
  return (
    <div
      onClick={onClick}
      style={{
        position: "absolute",
        top: "50%",
        left: 10,
        zIndex: 1,
        cursor: "pointer",
        opacity: visible ? 1 : 0,
        transform: visible ? "translateX(0)" : "translateX(-20px)",
        transition: "opacity 0.5s ease, transform 0.5s ease",
      }}
    >
      <ArrowCircleLeftIcon sx={{ color: "#f1f2f6" }} fontSize="large" />
    </div>
  );
};

export default PrevArrow;
