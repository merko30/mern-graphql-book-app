import React, { useEffect } from "react";
import { RouteComponentProps } from "react-router-dom";
import {
  faBookOpen,
  faCalendarDay,
  faStar,
} from "@fortawesome/free-solid-svg-icons";

import Error from "../../common/Error";
import Loading from "../../common/Loading";
import BookSuggestions from "./components/BookSuggestions";
import BookMenu from "../../books/BookMenu";
import IconWithLabel from "../../common/IconWithLabel";

import {
  Status,
  useAddOrUpdateBookMutation,
  useDeleteBookMutation,
  useGetSingleBookLazyQuery,
} from "../../generated";

import formatDate from "../../utils/formatDate";

const BookDetail = ({
  history,
  match: {
    params: { id },
  },
}: RouteComponentProps<{ id: string }>) => {
  const [runQuery, { data, loading, error }] = useGetSingleBookLazyQuery();
  const [deleteBook] = useDeleteBookMutation();
  const [addOrUpdateBook] = useAddOrUpdateBookMutation();

  useEffect(() => {
    runQuery({ variables: { id } });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  const onMenuItemClick = (status: Status | "delete" | "info") => {
    if (data?.getSingleBook) {
      const book = data.getSingleBook;
      if (status === "delete") {
        deleteBook({ variables: { id: book.id.toString() } });
      } else if (status === "info") {
        history.push("/");
      } else {
        addOrUpdateBook({
          variables: {
            input: {
              title: book.title,
              thumbnail: book.image_url,
              authors: book.authors.map((b) => b.name),
              id: book.id,
              status,
            },
          },
        });
      }
    }
  };

  return (
    <div className="bg-white my-5 rounded-md p-8 relative w-full md:w-2/3 container">
      {error && <Error error={error.message} />}
      {loading && (
        <div className="flex items-center justify-center h-screen">
          <Loading />
        </div>
      )}
      {data && data.getSingleBook && (
        <div className="mx-auto grid grid-rows-auto  grid-cols-1 md:grid-cols-3">
          {data && data.getSingleBook && (
            <BookMenu
              onClick={onMenuItemClick}
              className="mr-10 mt-10"
              book={{
                title: data.getSingleBook.title,
                id: data.getSingleBook.id,
                authors: data.getSingleBook.authors.map((a) => a.name),
                thumbnail: data.getSingleBook.image_url,
              }}
            />
          )}
          {/* <div className=" w-full md:w-1/3"> */}
          {data.getSingleBook.image_url && (
            <div className="row-start-1 row-end-2">
              <img
                className="object-contain"
                src={data.getSingleBook.image_url}
                alt={data.getSingleBook.title}
              />
            </div>
          )}

          <BookSuggestions books={data.getSingleBook.similar_books} />
          {/* </div> */}

          <div className="md:ml-4 row-start-2 row-end-3 md:row-start-1 md:row-end-2 md:col-start-2 md:col-end-4">
            <h1 className="text-xl md:text-2xl pr-4">
              {data.getSingleBook.title}
            </h1>
            {data.getSingleBook.authors &&
              data.getSingleBook.authors.map((a, i) => {
                const last = data.getSingleBook.authors.length - 1 === i;
                return (
                  <h2 key={a.id} className="text-md inline-block">
                    {a.name}
                    {!last ? " | " : " "}
                  </h2>
                );
              })}

            <div className="flex items-center my-2 bg-primary p-2 rounded justify-evenly">
              {data.getSingleBook.average_rating && (
                <IconWithLabel
                  topLabel="average rating"
                  icon={faStar}
                  iconColor="gold"
                  label={data.getSingleBook.average_rating}
                />
              )}
              <IconWithLabel
                topLabel="pages"
                label={`${data.getSingleBook.num_pages}`}
                iconColor="gray"
                icon={faBookOpen}
              />

              {data.getSingleBook.publication_date && (
                <IconWithLabel
                  topLabel="published at"
                  label={formatDate(data.getSingleBook.publication_date)}
                  iconColor="gray"
                  icon={faCalendarDay}
                />
              )}
            </div>
            <p
              className="text-sm text-gray-800 mt-4"
              dangerouslySetInnerHTML={{
                __html: data.getSingleBook.description,
              }}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default BookDetail;
