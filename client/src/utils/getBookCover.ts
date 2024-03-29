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
    return Object.values(imageLinks)[0];
  }
  return "nophoto";
};

export default getBookCover;
