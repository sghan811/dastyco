import React, { useState } from "react";
import Avatar from "../Avatar";
import { useSelector, useDispatch } from "react-redux";
import { GLOBALTYPES } from "../../redux/actions/globalTypes";
import CommunityMenus from "../CommunityMenus";
import LoadIcon from "../../images/loading.gif";
import LoadMoreBtn from "../LoadMoreBtn";
import { getDataAPI } from "../../utils/fetchData";
import { POST_TYPES } from "../../redux/actions/postAction";

const CommunityMenu = () => {
  const { homePosts, auth, theme } = useSelector((state) => state);
  const dispatch = useDispatch();

  const [load, setLoad] = useState(false);

  const handleLoadMore = async () => {
    setLoad(true);
    const res = await getDataAPI(
      `posts?limit=${homePosts.page * 9}`,
      auth.token
    );
    dispatch({
      type: POST_TYPES.GET_POSTS,
      payload: { ...res.data, page: homePosts.page + 1 },
    });
    setLoad(false);
  };
  return (
    <div className="community">
      {homePosts.posts.map((post) => (
        <>
          {post.community == post.community ? <></> : <></>}
          {/* Need something to filter same community */}
          <CommunityMenus key={post._id} post={post} theme={theme} />
        </>
      ))}
    </div>
  );
};

export default CommunityMenu;
{
  /* <button
onClick={() => dispatch({ type: GLOBALTYPES.STATUS, payload: true })}
className="statusBtn flex-fill "
style={{ marginLeft: "7px" }}
>
<span>{auth.user.username}, What's on your mind?</span>
</button> */
}
