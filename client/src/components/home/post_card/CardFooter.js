import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import LikeButton from "../../LikeButton";
import { useSelector, useDispatch } from "react-redux";
import {
  likePost,
  savePost,
  unLikePost,
  unSavePost,
} from "../../../redux/actions/postAction";
import ShareModal from "../../ShareModal";
import { BASE_URL } from "../../../utils/config";
import { BiConversation, BiShareAlt, BiAnchor } from "react-icons/bi";

const CardFooter = ({ post }) => {
  const [isLike, setIsLike] = useState(false);
  const [saved, setSaved] = useState(false);
  const [loadLike, setLoadLike] = useState(false);
  const [saveLoad, setSaveLoad] = useState(false);
  const [isShare, setIsShare] = useState(false);

  const dispatch = useDispatch();
  const { auth, theme, socket } = useSelector((state) => state);

  useEffect(() => {
    if (post.likes.find((like) => like._id === auth.user._id)) {
      setIsLike(true);
    } else {
      setIsLike(false);
    }
  }, [post.likes, auth.user._id]);

  const handleLike = async () => {
    if (loadLike) return;
    setLoadLike(true);
    await dispatch(likePost({ post, auth, socket }));
    setLoadLike(false);
  };

  const handleUnLike = async () => {
    if (loadLike) return;
    setLoadLike(true);
    await dispatch(unLikePost({ post, auth, socket }));
    setLoadLike(false);
  };
  const handleSavePost = async () => {
    if (saveLoad) return;
    setSaveLoad(true);
    await dispatch(savePost({ post, auth }));
    setSaveLoad(false);
  };

  const handleUnSavePost = async () => {
    if (saveLoad) return;
    setSaveLoad(true);
    await dispatch(unSavePost({ post, auth }));
    setSaveLoad(false);
  };

  useEffect(() => {
    if (auth.user.saved.find((id) => id === post._id)) {
      setSaved(true);
    } else {
      setSaved(false);
    }
  }, [post._id, auth.user.saved]);

  return (
    <div className="card_footer">
      <div className="card_icon_menu">
        <div className="d-flex">
          <LikeButton
            isLike={isLike}
            handleLike={handleLike}
            handleUnLike={handleUnLike}
          />
          &ensp;
          <Link to={`/post/${post._id}`} className="text-dark">
            <BiConversation className="icony" />
          </Link>
          &ensp;
          <BiShareAlt
            className="icony"
            alt="Send"
            onClick={() => setIsShare(!isShare)}
          />
        </div>
        {saved ? (
          <BiAnchor className="icony text-savy " onClick={handleUnSavePost} />
        ) : (
          <BiAnchor className="icony" onClick={handleSavePost} />
        )}
      </div>
      <div className="d-flex justify-content-start ">
        {post.likes.length == 0 ? (
          <a className="comments-num default">Be the first one to like!</a>
        ) : post.likes.length == 1 ? (
          <a className="comments-num default">{post.likes.length} like</a>
        ) : (
          <a className="comments-num default">{post.likes.length} likes</a>
        )}
      </div>

      {isShare && (
        <ShareModal
          url={`${BASE_URL}/post/${post._id}`}
          theme={theme}
          setIsShare={setIsShare}
        />
      )}
    </div>
  );
};

export default CardFooter;
