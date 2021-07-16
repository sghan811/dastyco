import React from "react";
import { useSelector, useDispatch } from "react-redux";

import UserCard from "../UserCard";
import FollowBtn from "../FollowBtn";
import LoadIcon from "../../images/loading.gif";

import { getSuggestions } from "../../redux/actions/suggestionsAction";
import UserCardSuggest from "../UserCardSuggest";

const RightSideBar = () => {
  const { auth, suggestions } = useSelector((state) => state);
  const dispatch = useDispatch();

  return (
    <div className="right-side-bar">
      <div className="">
        <UserCard user={auth.user} />
      </div>
      <div className="d-flex justify-content-between align-items-center ">
        <a>For you</a>
        {!suggestions.loading && (
          <div className=" d-flex justify-content-center align-items-center">
            <i
              className="fas fa-redo "
              style={{ cursor: "pointer" }}
              onClick={() => dispatch(getSuggestions(auth.token))}
            />
          </div>
        )}
      </div>

      {suggestions.loading ? (
        <img src={LoadIcon} alt="Loading..." className="d-block mx-auto" />
      ) : (
        <div className="suggestions">
          {suggestions.users.map((user) => (
            <div key={user._id} className="" style={{ borderRadius: "5px" }}>
              <UserCardSuggest key={user._id} user={user}>
                <FollowBtn key={user._id} user={user} />
              </UserCardSuggest>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default RightSideBar;
