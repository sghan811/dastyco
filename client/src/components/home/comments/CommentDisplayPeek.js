import React, { useEffect, useState } from "react";
import CommentCardPeek from "./CommentCardPeek";

const CommentDisplayPeek = ({ comment, post, replyCm }) => {
  const [showRep, setShowRep] = useState([]);
  const [next, setNext] = useState(1);

  useEffect(() => {
    setShowRep(replyCm.slice(replyCm.length - next));
  }, [replyCm, next]);

  return (
    <div className="comment_display">
      <CommentCardPeek post={post} comment={comment} commentId={comment._id}>
        <div className="ps-4">
          {showRep.map(
            (item, index) =>
              item.reply && (
                <CommentCardPeek
                  comment={item}
                  key={index}
                  post={post}
                  commentId={comment._id}
                />
              )
          )}

          {replyCm.length - next > 0 ? (
            <div
              onClick={() => setNext(next + 10)}
              style={{ cursor: "pointer" }}
              // style={{ cursor: "pointer", color: "crimson" }}
            >
              Load more...
            </div>
          ) : (
            replyCm.length > 1 && (
              <div
                onClick={() => setNext(1)}
                style={{ cursor: "pointer" }}
                // style={{ cursor: "pointer", color: "crimson" }}
              >
                Hide...
              </div>
            )
          )}
        </div>
      </CommentCardPeek>
    </div>
  );
};

export default CommentDisplayPeek;
