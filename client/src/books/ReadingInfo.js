import React from "react";

const ReadingInfo = ({ wishlistCount, readingCount, readCount }) => {
  return (
    <div className="my-10 md:mt-5 px-2">
      <h1 className="text-sm" style={{ letterSpacing: "0.2em" }}>
        Wishlist({wishlistCount})
      </h1>
      <h1 className="text-sm" style={{ letterSpacing: "0.2em" }}>
        Currently reading({readingCount})
      </h1>
      <h1 className="text-sm" style={{ letterSpacing: "0.2em" }}>
        Read({readCount})
      </h1>
    </div>
  );
};

export default ReadingInfo;
