interface ReadingInfoProps {
  wishlist: number;
  reading: number;
  read: number;
}

const ReadingInfo = ({ wishlist, reading, read }: ReadingInfoProps) => {
  return (
    <div className="my-10 md:pr-5 md:mt-5 pr-2">
      <h1
        className="text-sm whitespace-no-wrap"
        style={{ letterSpacing: "0.2em" }}
      >
        Wishlist({wishlist})
      </h1>
      <h1
        className="text-sm whitespace-no-wrap"
        style={{ letterSpacing: "0.2em" }}
      >
        Currently reading({reading})
      </h1>
      <h1
        className="text-sm whitespace-no-wrap"
        style={{ letterSpacing: "0.2em" }}
      >
        Read({read})
      </h1>
    </div>
  );
};

export default ReadingInfo;
