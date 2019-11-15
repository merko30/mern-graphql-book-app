import React, { useRef, useState, useEffect } from "react";
import ReactDOM from "react-dom";

import GoogleSearch from "../API/search";

import { Loading, Error } from "../components";

import shorten from "../helpers/shortenAuthorName";
import BookMenu from "../components/Menu/BookMenu";

const BookDetail = ({
  match: {
    params: { id }
  }
}) => {
  const [book, setBook] = useState(null);
  const [loading, setLoading] = useState(false);
  const [show, setShow] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    GoogleSearch.searchById(id)
      .then(data => {
        setBook(data);
        setLoading(false);
      })
      .catch(error => setError(error.message));
  }, []);

  return (
    <div className="relative h-screen mx-4">
      {error && <Error error={error.message} />}
      {loading && <Loading />}
      {book && (
        <div className="mx-auto container flex lg:flex-row flex-col flex-wrap">
          {localStorage.getItem("token") && (
            <BookMenu
              show={show}
              handleMenu={() => setShow(!show)}
              book={{
                title: book.volumeInfo.title,
                bookID: id,
                authors: book.volumeInfo.authors,
                cover: book.volumeInfo.imageLinks.thumbnail
              }}
            />
          )}

          <div>
            {book.volumeInfo.imageLinks && (
              <img
                src={book.volumeInfo.imageLinks.thumbnail}
                alt={book.volumeInfo.title}
              />
            )}

            {book.volumeInfo.averageRating && (
              <p>
                Rating: <i className="fa fa-star"></i>{" "}
                {book.volumeInfo.averageRating}
              </p>
            )}

            {book.volumeInfo.pageCount && (
              <p>Page count: {book.volumeInfo.pageCount}</p>
            )}
          </div>

          <div className="lg:ml-4 lg:w-3/4">
            <h2>{book.volumeInfo.title}</h2>
            {book.volumeInfo.authors &&
              book.volumeInfo.authors.map((a, i) => {
                return (
                  <h4 key={i} className="text-gray-dark">
                    {shorten(a)}
                  </h4>
                );
              })}
            <span className="spec">Publisher: {book.volumeInfo.publisher}</span>
            <p
              className="text-grey-light"
              dangerouslySetInnerHTML={{ __html: book.volumeInfo.description }}
            ></p>
          </div>
        </div>
      )}
    </div>
  );
};

export default BookDetail;
