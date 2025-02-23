import { Maybe } from "graphql/jsutils/Maybe";

interface ImageLinks {
  smallThumbnail?: Maybe<string>;
  thumbnail?: Maybe<string>;
  small?: Maybe<string>;
  medium?: Maybe<string>;
  large?: Maybe<string>;
  extraLarge?: Maybe<string>;
}

const getBookCover = (imageLinks: ImageLinks | null | undefined): string => {
  if (imageLinks) {
    return (
      imageLinks.extraLarge ||
      imageLinks.large ||
      imageLinks.medium ||
      imageLinks.small ||
      imageLinks.thumbnail ||
      imageLinks.smallThumbnail ||
      "nophoto"
    );
  }
  return "nophoto";
};

export default getBookCover;
