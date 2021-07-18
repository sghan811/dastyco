import React from "react";
import { useSelector } from "react-redux";

import HashPosts from "../components/home/HashPosts";
import Status from "../components/home/Status";
import RightSideBar from "../components/home/RightSideBar";

import LoadIcon from "../images/loading.gif";

const HashHome = () => {
  const { homePosts } = useSelector((state) => state);
  return (
    <div className="home-grid">
      <div className="">
        <Status />
        {homePosts.loading ? (
          <img src={LoadIcon} alt="loading" className="d-block mx-auto" />
        ) : homePosts.result === 0 ? (
          <h2 className="text-center">No Post</h2>
        ) : (
          <HashPosts />
        )}
      </div>

      <div className="">
        <RightSideBar />
      </div>
    </div>
  );
};

export default HashHome;
