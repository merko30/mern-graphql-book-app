import React from "react";

interface RatingProps {
  rating: number | string;
}

const Rating = ({ rating }: RatingProps) => {
  return (
    <div className="flex items-center text-orange-400">
      <i className="fa fa-star"></i>
      <p className="ml-2">{rating}</p>
    </div>
  );
};

export default Rating;
