import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useApolloClient } from "@apollo/client";
import {
  faBookOpen,
  faCalendarDay,
  faStar,
} from "@fortawesome/free-solid-svg-icons";

import { Error, Loading, IconWithLabel, BookMenu } from "src/common/index";

// import BookSuggestions from "./components/BookSuggestions";

import {
  Status,
  useAddOrUpdateBookMutation,
  useDeleteBookMutation,
  useGetSingleBookLazyQuery,
  BooksDocument,
  BooksQuery,
  BooksQueryVariables,
  CountsDocument,
  // Book,
} from "src/generated/index";

import formatDate from "src/utils/formatDate";
import getBookCover from "src/utils/getBookCover";

const BookDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [runQuery, { data, loading, error }] = useGetSingleBookLazyQuery();
  const { getSingleBook } = data || {};
  const [deleteBook] = useDeleteBookMutation();
  const [addOrUpdateBook] = useAddOrUpdateBookMutation();
  const client = useApolloClient();

  useEffect(() => {
    if (id) {
      runQuery({ variables: { id } });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  const onMenuItemClick = (status: Status | "delete" | "info") => {
    if (data?.getSingleBook) {
      const book = getSingleBook;
      if (book) {
        if (status === "delete") {
          deleteBook({
            variables: { id: book.id.toString() },
            update: ({ readQuery, writeQuery }) => {
              const data = readQuery<BooksQuery, BooksQueryVariables>({
                query: BooksDocument,
                variables: { input: {} },
              });

              if (data) {
                writeQuery<BooksQuery, BooksQueryVariables>({
                  query: BooksDocument,
                  data: {
                    ...data,
                    books: {
                      ...data.books,
                      books: data.books.books.filter(
                        (b) => b.id !== book.id.toString()
                      ),
                    },
                  },
                });
              }
            },
          });
        } else if (status === "info") {
          navigate(`/book/${book.id.toString()}`);
        } else {
          addOrUpdateBook({
            refetchQueries: [{ query: CountsDocument }],
            // cache updating
            update: (cache, { data }) => {
              try {
                const oldData = cache.readQuery<
                  BooksQuery,
                  BooksQueryVariables
                >({
                  query: BooksDocument,
                  variables: { input: {} },
                });
                if (oldData && data) {
                  const {
                    books: { books: booksArray },
                  } = oldData;

                  let newBooks = [];

                  const index = booksArray.findIndex(
                    (b) => b.id === book.id.toString()
                  );

                  const {
                    addOrUpdateBook: { __typename, ...newBook },
                  } = data;

                  if (booksArray[index]) {
                    booksArray[index].status = status;
                    newBooks = booksArray;
                  } else {
                    newBooks = [...booksArray, newBook];
                  }

                  client.writeQuery<BooksQuery, BooksQueryVariables>({
                    query: BooksDocument,
                    variables: { input: {} },
                    data: {
                      ...oldData,
                      books: {
                        ...oldData.books,
                        books: newBooks,
                      },
                    },
                  });
                }
              } catch (err) {
                return;
              }
            },
            variables: {
              input: {
                title: book.volumeInfo.title,
                thumbnail: getBookCover(book.volumeInfo.imageLinks),
                authors: book.volumeInfo.authors ?? [],
                id: book.id,
                status,
              },
            },
          });
        }
      }
    }
  };

  if (!getSingleBook) return null;

  const {
    volumeInfo: {
      title,
      authors,
      imageLinks,
      averageRating,
      pageCount,
      publishedDate,
      description,
    },
  } = getSingleBook;

  return (
    <div className=" my-5 rounded-md p-3 relative w-full md:w-2/3 mx-auto">
      <div className="px-2 md:px-6 bg-white md:p-8">
        {error && <Error error={error.message} />}
        {loading && (
          <div className="flex items-center justify-center h-screen">
            <Loading />
          </div>
        )}
        {getSingleBook && (
          <div className="mx-auto grid grid-rows-auto  grid-cols-1 md:grid-cols-3 py-3 justify-items-center">
            {/* <div className=" w-full md:w-1/3"> */}
            <div className="row-start-1 row-end-2 my-2">
              <img
                className="object-contain"
                src={getBookCover(imageLinks)}
                alt={title}
              />
            </div>

            {/* <BookSuggestions books={getSingleBook.similar_books} /> */}
            {/* </div> */}

            <div className="md:ml-4 row-start-2 row-end-3 md:row-start-1 md:row-end-3 md:col-start-2 md:col-end-4 relative">
              <BookMenu
                onClick={onMenuItemClick}
                className="mr-0 mt-2"
                book={{
                  title: title,
                  id: getSingleBook.id,
                  authors: authors ?? [],
                  thumbnail: getBookCover(imageLinks),
                }}
              />
              <h1 className="text-xl md:text-2xl pr-6">{title}</h1>
              {authors &&
                authors.map((a, i) => {
                  const last = authors ?? [].length - 1 === i;
                  return (
                    <h2 key={a} className="text-md inline-block">
                      {a}
                      {!last ? "\u00A0|\u00A0" : "\u00A0"}
                    </h2>
                  );
                })}

              <div className="flex flex-col md:flex-row items-center my-2 bg-background_two p-2 rounded justify-evenly">
                {averageRating && (
                  <IconWithLabel
                    topLabel="average rating"
                    icon={faStar}
                    iconColor="gold"
                    label={averageRating}
                  />
                )}
                <IconWithLabel
                  topLabel="pages"
                  label={`${pageCount}`}
                  iconColor="gray"
                  icon={faBookOpen}
                />

                {publishedDate && (
                  <IconWithLabel
                    topLabel="published at"
                    label={formatDate(publishedDate)}
                    iconColor="gray"
                    icon={faCalendarDay}
                  />
                )}
              </div>
              {description && (
                <p
                  className="text-sm text-gray-800 mt-4"
                  dangerouslySetInnerHTML={{
                    __html: description,
                  }}
                />
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default BookDetail;
