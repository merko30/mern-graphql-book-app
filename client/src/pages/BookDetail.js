import React, { useState, useEffect } from "react";

import GoogleSearch from "../API/search";

import Error from "../common/Error";
import Loading from "../common/Loading";

import BookMenu from "../common/Menu/BookMenu";
import Authors from "../books/Authors";

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
    <div className="relative mt-10 flex flex-col items-center justify-center px-4 md:px-10 lg:px-24 container mx-auto">
      {error && <Error error={error.message} />}
      {loading && <Loading />}
      {book && (
        <div className="mx-auto container flex">
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

          <div className="w-2/12">
            {book.volumeInfo.imageLinks && (
              <img
                src={book.volumeInfo.imageLinks.thumbnail}
                alt={book.volumeInfo.title}
              />
            )}
          </div>

          <div className="w-10/12 ml-4">
            <h1 className="text-3xl text-secondary">{book.volumeInfo.title}</h1>
            {book.volumeInfo.authors && (
              <Authors authors={book.volumeInfo.authors} classes="mb-0" />
            )}
            <span className="text-orange-700 text-sm">
              Publisher: {book.volumeInfo.publisher}
            </span>
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
