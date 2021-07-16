import React, { useState, useEffect } from "react";
import moment from "moment";
import { Link } from "react-router-dom";
import LikeButton from "../../LikeButton";
import LikeleftButton from "../../LikeleftButton";
import LikerightButton from "../../LikerightButton";
import { imageShow, videoShow } from "../../../utils/mediaShow";
import { useSelector, useDispatch } from "react-redux";
import {
  likePost,
  likeleftPost,
  likerightPost,
  savePost,
  unLikePost,
  unLikeleftPost,
  unLikerightPost,
  unSavePost,
} from "../../../redux/actions/postAction";
import ShareModal from "../../ShareModal";
import Carousel from "../../Carousel";

const CardBody = ({ post }) => {
  const [isLike, setIsLike] = useState(false);
  const [isLikeleft, setIsLikeleft] = useState(false);
  const [isLikeright, setIsLikeright] = useState(false);
  const [saved, setSaved] = useState(false);
  const [loadLike, setLoadLike] = useState(false);
  const [loadLikeleft, setLoadLikeleft] = useState(false);
  const [loadLikeright, setLoadLikeright] = useState(false);
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
    if (post.likelefts.find((likeleft) => likeleft._id === auth.user._id)) {
      setIsLikeleft(true);
    } else {
      setIsLikeleft(false);
    }
    if (post.likerights.find((likeright) => likeright._id === auth.user._id)) {
      setIsLikeright(true);
    } else {
      setIsLikeright(false);
    }
  }, [post.likes, post.likelefts, post.likerights, auth.user._id]);
  const handleLikeleft = async () => {
    if (loadLikeleft) return;
    setLoadLikeleft(true);
    await dispatch(likeleftPost({ post, auth, socket }));
    setLoadLikeleft(false);
  };

  const handleUnLikeleft = async () => {
    if (loadLikeleft) return;
    setLoadLikeleft(true);
    await dispatch(unLikeleftPost({ post, auth, socket }));
    setLoadLikeleft(false);
  };

  // const handle = async () => {
  //   if (loadLikeright) return;
  //   setLoadLikeright(true);
  //   await dispatch(unLikerightPost({ post, auth, socket }));
  //   setLoadLikeright(false);

  //   if (loadLikeleft) return;
  //   setLoadLikeleft(true);
  //   await dispatch(likeleftPost({ post, auth, socket }));
  //   setLoadLikeleft(false);
  // };

  const handleLikeright = async () => {
    if (loadLikeright) return;
    setLoadLikeright(true);
    await dispatch(likerightPost({ post, auth, socket }));
    setLoadLikeright(false);
  };

  const handleUnLikeright = async () => {
    if (loadLikeright) return;
    setLoadLikeright(true);
    await dispatch(unLikerightPost({ post, auth, socket }));
    setLoadLikeright(false);
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
  const [readMore, setReadMore] = useState();
  const [readMores, setReadMores] = useState();
  return (
    <div className="card_body">
      <div
        className="card_body-content"
        style={{
          filter: theme ? "invert(1)" : "invert(0)",
          color: theme ? "white" : "#111",
        }}
      ></div>
      <div>Total votes of {post.likerights.length + post.likelefts.length}</div>
      {isLikeleft || isLikeright ? (
        <div className="buttons-box">
          <div>
            {(post.likelefts.length /
              (post.likelefts.length + post.likerights.length)) *
              100}{" "}
            %
          </div>
          <div>
            {(post.likerights.length /
              (post.likelefts.length + post.likerights.length)) *
              100}{" "}
            %
          </div>
          <div>{post.likelefts.length} votes</div>
          <div>{post.likerights.length} votes</div>
        </div>
      ) : (
        <></>
      )}
      <div className="buttons-box">
        {post.images.map((img, index) => (
          <div key={index} className="file_imgs">
            {index == 0 && (
              <>
                {isLikeleft ? (
                  <>
                    <div className="contentbox">
                      <button onClick={handleUnLikeleft}>
                        <img src={img.url} className="" alt={img.url} />
                      </button>
                    </div>
                    <div className="contentsub">
                      <span>
                        {post.content.length < 20
                          ? post.content
                          : readMores
                          ? post.content + " "
                          : post.content.slice(0, 20) + "  ..."}
                      </span>
                    </div>
                    {post.contentsub.length > 20 && (
                      <span
                        className="readMore"
                        onClick={() => setReadMores(!readMores)}
                      >
                        {readMores ? "Hide Contents" : "Read More"}
                      </span>
                    )}
                  </>
                ) : (
                  <>
                    <div className="contentbox">
                      <button onClick={handleLikeleft}>
                        <img src={img.url} className="" alt={img.url} />
                      </button>
                    </div>
                    <div className="contentsub">
                      <span>
                        {post.content.length < 20
                          ? post.content
                          : readMores
                          ? post.content + " "
                          : post.content.slice(0, 20) + "  ..."}
                      </span>
                    </div>
                    {post.contentsub.length > 20 && (
                      <span
                        className="readMore"
                        onClick={() => setReadMores(!readMores)}
                      >
                        {readMores ? "Hide Contents" : "Read More"}
                      </span>
                    )}
                  </>
                )}
              </>
            )}
            {index == 1 && (
              <>
                {isLikeright ? (
                  <>
                    <div className="contentbox">
                      <button onClick={handleUnLikeright}>
                        <img src={img.url} className="" alt={img.url} />
                      </button>
                    </div>
                    <div className="contentsub">
                      <span>
                        {post.contentsub.length < 20
                          ? post.contentsub
                          : readMore
                          ? post.contentsub + " "
                          : post.contentsub.slice(0, 20) + "  ..."}
                      </span>
                    </div>
                    {post.content.length > 20 && (
                      <span
                        className="readMore"
                        onClick={() => setReadMore(!readMore)}
                      >
                        {readMore ? "Hide Content" : "Read More"}
                      </span>
                    )}
                  </>
                ) : (
                  <>
                    <div className="contentbox">
                      <button onClick={handleLikeright}>
                        <img src={img.url} className="" alt={img.url} />
                      </button>
                    </div>
                    <div className="contentsub">
                      <span>
                        {post.contentsub.length < 20
                          ? post.contentsub
                          : readMore
                          ? post.contentsub + " "
                          : post.contentsub.slice(0, 20) + "  ..."}
                      </span>
                    </div>
                    {post.content.length > 20 && (
                      <span
                        className="readMore"
                        onClick={() => setReadMore(!readMore)}
                      >
                        {readMore ? "Hide Content" : "Read More"}
                      </span>
                    )}
                  </>
                )}
              </>
            )}
          </div>
        ))}
      </div>
      <div>
        <a className="text-muted posted-date">
          {moment(post.createdAt).fromNow()}
        </a>
      </div>
    </div>
  );
};

export default CardBody;

{
  /* {post.images.length > 0 && (
        <Carousel images={post.images} id={post._id} />
      )} */
}
{
  /* <div>
            {isLikeright ? (
        <button onClick={handleUnLikeright}>
        <img src={img.url} className="" alt={img.url} />
        </button>
      ) : (
        <button onClick={handleLikeright} >
        <img src={img.url} className="" alt={img.url} />
        </button>
      )}
      
    </div> */
}

// isLikeright ? (
//   <>
//     <div>
//       {(post.likelefts.length /
//         (post.likelefts.length + post.likerights.length)) *
//         100}{" "}
//       votes
//     </div>
//     <div>
//       <button onClick={handle}>
//         <img src={img.url} className="" alt={img.url} />
//       </button>
//     </div>
//     <div>{post.likelefts.length} votes</div>
//     <div>
//       <span>
//         {post.content.length < 60
//           ? post.content
//           : readMore
//           ? post.content + " "
//           : post.content.slice(0, 60) + "  ..."}
//       </span>
//     </div>
//   </>
// ) :
