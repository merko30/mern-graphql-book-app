import React from "react";

export default function MoreIcon({ handleClick }) {
  return (
    <div
      className="h-8 w-8 cursor-pointer rounded-full bg-primary ml-2 md:ml-0 absoulte top-0 right-0 flex items-center justify-center"
      onClick={handleClick}
    >
      <i className="fa fa-ellipsis-v more"></i>
    </div>
  );
}
