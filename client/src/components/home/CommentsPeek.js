import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import CommentDisplayPeek from "./comments/CommentDisplayPeek";

const CommentsPeek = ({ post }) => {
  const [comments, setComments] = useState([]);
  const [showComments, setShowComments] = useState([]);
  const [next, setNext] = useState(2);
  const [replyComments, setReplyComments] = useState([]);

  useEffect(() => {
    const newCm = post.comments.filter((cm) => !cm.reply);
    setComments(newCm);
    setShowComments(newCm.slice(newCm.length - next));
  }, [post.comments, next]);

  useEffect(() => {
    const newReply = post.comments.filter((cm) => cm.reply);
    setReplyComments(newReply);
  }, [post.comments]);

  return (
    <div className="comments">
      {showComments.map((comment, index) => (
        <CommentDisplayPeek
          key={index}
          comment={comment}
          post={post}
          replyCm={replyComments.filter((item) => item.reply === comment._id)}
        />
      ))}
      {post.comments.length == 0 ? (
        <Link to={`/post/${post._id}`} className="comments-num default">
          {post.comments.length} comment
        </Link>
      ) : post.comments.length == 1 ? (
        <Link to={`/post/${post._id}`} className="comments-num default">
          {post.comments.length} comment
        </Link>
      ) : (
        <Link to={`/post/${post._id}`} className="comments-num default">
          {post.comments.length} comments
        </Link>
      )}
    </div>
  );
};

export default CommentsPeek;
