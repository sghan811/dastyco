import React from "react";
import { useSelector } from "react-redux";

const LikerightButton = ({
  isLikeright,
  handleLikeright,
  handleUnLikeright,
}) => {
  const { theme } = useSelector((state) => state);
  return (
    <div>
      {isLikeright ? (
        <i
          className="fas fa-thumbs-up text-info"
          style={{ filter: theme ? "invert(1)" : "invert(0)" }}
          onClick={handleUnLikeright}
        />
      ) : (
        <i className="far fa-thumbs-up" onClick={handleLikeright} />
      )}
    </div>
  );
};

export default LikerightButton;
