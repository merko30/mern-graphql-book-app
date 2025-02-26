import Loading from "src/common/Loading";
import Error from "src/common/Error";

import {
  Book,
  Status,
  useBooksQuery,
  useCountsQuery,
} from "src/generated/index";

import BookList from "./components/BookList";
import MultipleContainers from "./Comp";
import { useMemo } from "react";

const Dashboard = () => {
  const { data, loading, error } = useBooksQuery({
    variables: {
      input: {},
    },
  });
  const { data: countData } = useCountsQuery();

  const groupedBooks = useMemo(
    () =>
      data?.books.books.reduce<Record<string, Book[]>>(
        (acc, book) => {
          const status = book.status.toString();
          if (!acc[status]) {
            acc[status] = [];
          }

          acc[status].push(book);

          return acc;
        },
        {
          [Status.Wishlist]: [],
          [Status.Reading]: [],
          [Status.Read]: [],
        }
      ),
    [data]
  );

  return (
    <div className="container h-full">
      {loading && <Loading className="mx-auto mt-32" />}
      {error && <Error error={error.message} />}

      {/* {data && countData && (
        <div className="py-10 w-100 h-full">
          <BookList
            books={data.books.books.filter((b) => b.status === Status.Wishlist)}
            count={countData?.counts.wishlist}
            listName={Status.Wishlist}
          />
          <BookList
            books={data.books.books.filter((b) => b.status === Status.Reading)}
            count={countData?.counts.reading}
            listName={Status.Reading}
          />
          <BookList
            books={data.books.books.filter((b) => b.status === Status.Read)}
            count={countData?.counts.read}
            listName={Status.Read}
          />
        </div>
      )} */}
      <MultipleContainers items={groupedBooks} />
    </div>
  );
};

export default Dashboard;
