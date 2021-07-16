import React, { useState, useEffect } from "react";
import useDocumentScrollThrottled from "./useDocumentScrollThrottled";
import "./global.scss";
import "./mobile-nav.scss";
function Test() {
  const [shouldHideHeader, setShouldHideHeader] = useState(false);
  const [shouldShowShadow, setShouldShowShadow] = useState(false);

  const MINIMUM_SCROLL = 100;
  const TIMEOUT_DELAY = 100;

  useDocumentScrollThrottled((callbackData) => {
    const { previousScrollTop, currentScrollTop } = callbackData;
    const isScrolledDown = previousScrollTop > currentScrollTop;
    const isMinimumScrolled = currentScrollTop > MINIMUM_SCROLL;

    setShouldShowShadow(currentScrollTop > 1.5);

    setTimeout(() => {
      setShouldHideHeader(isScrolledDown && isMinimumScrolled);
    }, TIMEOUT_DELAY);
  });

  const shadowStyle = shouldShowShadow ? "shadow" : "";
  const hiddenStyle = shouldHideHeader ? "hidden" : "";
  return (
    <div className="long">
      <nav className="mobile-nav">
        <div className="">hi</div>
        <div className="blocky"></div>
      </nav>
    </div>
  );
}

export default Test;

// import { IconName } from "react-icons/bi";

// <BiTrashAlt/>
// <BiTrash/>
// <BiCopy/>
// <BiCopyAlt/>
{
  /* <BiImageAdd/> */
}

// <BiLike/>
// <BiConversation/>
// <BiShareAlt/>
// <BiAnchor/>
// <BiAngry/>
// <BiPencil/>

// <BiHomeAlt/>
// <BiRocket/>
// <BiPlanet/>
// <BiBell/>
// <BiUserCircle/>

// <BiPlus/>
// <BiPlusCircle/>

// <BiSearchAlt/>
