import React, { useState, useEffect, useContext } from "react";
import { useQuery } from "react-apollo";
import { loader } from "graphql.macro";

import apiContext from "../books/context/api";

import Error from "../common/Error";
import Loading from "../common/Loading";

import BookMenu from "../books/BookMenu";
import Authors from "../books/Authors";

const query = loader("../graphql/books.graphql");

const BookDetail = ({
  match: {
    params: { id }
  }
}) => {
  const api = useContext(apiContext);
  const [book, setBook] = useState(null);
  const [loading, setLoading] = useState(false);
  const [show, setShow] = useState(false);
  const [error, setError] = useState(null);

  const { data } = useQuery(query);

  const getBook = async () => {
    setLoading(true);
    try {
      const data = await api.getSingle(id);
      setBook(data);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      setError(error);
    }
  };

  useEffect(() => {
    getBook();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  return (
    <div className="relative mt-10 flex flex-col md:flex-row items-center justify-center md:px-10 lg:px-24 container">
      {error && <Error error={error.message} />}
      {loading && (
        <div className="flex items-center justify-center h-screen">
          <Loading />
        </div>
      )}
      {book && (
        <div className="mx-auto flex flex-col sm:flex-row items-start justify-center">
          {data && data.books && (
            <BookMenu
              classes="mr-10"
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

          <div className="sm:w-2/5 md:w-1/3 lg:w-2/12 flex items-start h-100">
            {book.volumeInfo.imageLinks && (
              <img
                className="w-full h-full object-contain"
                src={book.volumeInfo.imageLinks.thumbnail}
                alt={book.volumeInfo.title}
              />
            )}
          </div>

          <div className="w-100 sm:w-2/3 lg:w-10/12 ml-0 sm:ml-4">
            <h1 className="text-3xl text-secondary">{book.volumeInfo.title}</h1>
            {book.volumeInfo.authors && (
              <Authors authors={book.volumeInfo.authors} classes="mb-0" />
            )}
            <h3 className="text-lg mt-5">Description</h3>
            <p
              className="text-grey-500"
              dangerouslySetInnerHTML={{ __html: book.volumeInfo.description }}
            ></p>
          </div>
        </div>
      )}
    </div>
  );
};

export default BookDetail;
