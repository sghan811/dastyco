import React, { useEffect } from "react";
import "./Spam.css";
import { useDispatch, useSelector } from "react-redux";
import ContentList from "../ContentList";
import ContentsubList from "../ContentsubList";
import CommunityList from "../CommunityList";
import { getSpamPosts } from "../../../redux/actions/adminAction";

const Spam = () => {
  const { auth, admin } = useSelector((state) => state);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getSpamPosts(auth.token));
  }, [dispatch, auth.token]);

  return (
    <div className="main_admin">
      <div className="main__container">
        <div className="main__title">
          <div className="main__greeting">
            <h1>Hello {auth.user.username}</h1>
            <p>Spam Dashboard</p>
          </div>
        </div>
        <div className="spam">
          <ContentList content={admin.spam_posts} />
          <ContentsubList contentsub={admin.spam_posts} />
          <CommunityList community={admin.spam_posts} />
        </div>
      </div>
    </div>
  );
};

export default Spam;
