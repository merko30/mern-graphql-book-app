import Loading from "src/common/Loading";
import Error from "src/common/Error";

import { Status, useBooksQuery, useCountsQuery } from "src/generated/index";

import BookList from "./components/BookList";

const Dashboard = () => {
  const { data, loading, error } = useBooksQuery({
    variables: {
      input: {},
    },
  });
  const { data: countData } = useCountsQuery();

  console.log(JSON.stringify(error, null, 2));
  return (
    <div className="container h-full">
      {loading && <Loading className="mx-auto mt-32" />}
      {error && <Error error={error.message} />}

      {data && countData && (
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
      )}
    </div>
  );
};

export default Dashboard;
