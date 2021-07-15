import React from "react";
import { BiLike } from "react-icons/bi";
import { useSelector } from "react-redux";

const LikeButton = ({ isLike, handleLike, handleUnLike }) => {
  const { theme } = useSelector((state) => state);
  return (
    <div>
      {isLike ? (
        <BiLike
          // style={{ filter: theme ? "invert(1)" : "invert(0)" }}
          className="icony text-liky "
          onClick={handleUnLike}
        />
      ) : (
        <BiLike className="icony" onClick={handleLike} />
      )}
    </div>
  );
};

export default LikeButton;
