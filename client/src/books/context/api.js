import { createContext } from "react";

const {
  REACT_APP_GOOGLE_BOOKS_API_KEY,
  REACT_APP_GOOGLE_BOOKS_API_URL
} = process.env;

const search = async term => {
  try {
    const res = await fetch(`${REACT_APP_GOOGLE_BOOKS_API_URL}?q=${term}&key=${REACT_APP_GOOGLE_BOOKS_API_KEY}
    `);
    return await res.json();
  } catch (error) {
    return error;
  }
};

const getSingle = async id => {
  try {
    const res = await fetch(`${REACT_APP_GOOGLE_BOOKS_API_URL}/${id}
    `);
    return await res.json();
  } catch (error) {
    return error;
  }
};

const apiContext = createContext({
  search,
  getSingle
});

export default apiContext;
