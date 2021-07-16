import React, { useState, useEffect } from "react";
import Avatar from "../../Avatar";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import moment from "moment";
import LikeButton from "../../LikeButton";
import CommentMenu from "./CommentMenu";
import {
  likeComment,
  unLikeComment,
  updateComment,
} from "../../../redux/actions/commentAction";
import InputComment from "../InputComment";

const CommentCard = ({ children, comment, post, commentId }) => {
  const { auth, theme } = useSelector((state) => state);
  const dispatch = useDispatch();
  const [content, setContent] = useState("");
  const [readMore, setReadMore] = useState(false);

  const [isLike, setIsLike] = useState(false);
  const [loadLike, setLoadLike] = useState(false);
  const [onEdit, setOnEdit] = useState(false);
  const [onReply, setOnReply] = useState(false);

  useEffect(() => {
    setContent(comment.content);
    setIsLike(false);
    setOnReply(false);
    if (comment.likes.find((like) => like._id === auth.user._id)) {
      setIsLike(true);
    }
  }, [comment, auth.user._id]);

  const handleUpdate = () => {
    if (comment.content !== content) {
      dispatch(updateComment({ comment, post, content, auth }));
      setOnEdit(false);
    } else {
      setOnEdit(false);
    }
  };

  const handleLike = async () => {
    if (loadLike) return;

    setIsLike(true);

    setLoadLike(true);
    await dispatch(likeComment({ comment, post, auth }));
    setLoadLike(false);
  };

  const handleUnLike = async () => {
    if (loadLike) return;

    setIsLike(false);
    setLoadLike(true);
    await dispatch(unLikeComment({ comment, post, auth }));
    setLoadLike(false);
  };

  const handleReply = () => {
    if (onReply) {
      return setOnReply(false);
    }
    setOnReply({ ...comment, commentId });
  };

  const styleCard = {
    opacity: comment._id ? 1 : 0.5,
    pointerEvents: comment._id ? "inherit" : "none",
  };

  return (
    <div className="comment_card " style={styleCard}>
      <div className="comment_content_peek">
        <Link to={`/profile/${comment.user._id}`} className="d-flex">
          <Avatar src={comment.user.avatar} size="small-avatar" />
          &nbsp;
          <a className="default font-bold">{comment.user.username}</a>
        </Link>
        &nbsp;
        <div
          className="flex-fill"
          style={{
            filter: theme ? "invert(1)" : "invert(0)",
          }}
        >
          {onEdit ? (
            <textarea
              rows="1"
              value={content}
              onChange={(e) => setContent(e.target.value)}
            />
          ) : (
            <div>
              {comment.tag && comment.tag._id !== comment.user._id && (
                <Link className="default" to={`/profile/${comment.tag._id}`}>
                  @{comment.tag.username}
                </Link>
              )}
              <Link className="default" to={`/post/${post._id}`}>
                {content.length < 100
                  ? content
                  : readMore
                  ? content + " "
                  : content.slice(0, 100) + "..."}
              </Link>
              {content.length > 100 && (
                <span
                  className="readMore"
                  onClick={() => setReadMore(!readMore)}
                >
                  {readMore ? "Hide " : "Read more"}
                </span>
              )}
            </div>
          )}
        </div>
        <div
          className="d-flex align-items-center "
          style={{ cursor: "pointer" }}
        >
          <LikeButton
            isLike={isLike}
            handleLike={handleLike}
            handleUnLike={handleUnLike}
          />
        </div>
      </div>

      {onReply && (
        <InputComment post={post} onReply={onReply} setOnReply={setOnReply}>
          <Link
            style={{ textDecoration: "none" }}
            className="mr-1"
            to={`/profile/${onReply.user._id}`}
          >
            @{onReply.user.username}
          </Link>
        </InputComment>
      )}
      {children}
    </div>
  );
};

export default CommentCard;
