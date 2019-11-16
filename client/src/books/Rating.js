import React from "react";

const Rating = ({ rating }) => {
  return (
    <div className="flex items-center text-orange-900">
      <i className="fa fa-star"></i>
      <p className="ml-2">{rating}</p>
    </div>
  );
};

export default Rating;
