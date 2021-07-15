import React from "react";
import { useSelector } from "react-redux";

const LikeleftButton = ({ isLikeleft, handleLikeleft, handleUnLikeleft }) => {
  const { theme } = useSelector((state) => state);
  return (
    <div>
      {isLikeleft ? (
        <i
          className="fas fa-thumbs-up text-info"
          style={{ filter: theme ? "invert(1)" : "invert(0)" }}
          onClick={handleUnLikeleft}
        />
      ) : (
        <i className="far fa-thumbs-up" onClick={handleLikeleft} />
      )}
    </div>
  );
};

export default LikeleftButton;
