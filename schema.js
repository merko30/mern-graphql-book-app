const { gql } = require("apollo-server");

const schema = gql`
  type Book {
    _id: String
    title: String
    bookID: String
    status: String
    cover: String
    authors: [String]
    userId: String
  }
  type Counts {
    wishlist: Int
    reading: Int
    read: Int
  }
  type BooksResponse {
    books: [Book]
    counts: Counts
    totalPages: Int
  }
  type BookResponse {
    book: Book
  }
  type MeResponse {
    _id: String
    username: String
    email: String
  }
  type LoginResponse {
    token: String
    user: MeResponse
  }
  type Ok {
    ok: Boolean
  }
  type Query {
    me(id: String): MeResponse
    books(status: String, perPage: Int, page: Int): BooksResponse
  }
  type Mutation {
    addBook(
      title: String
      authors: [String]
      bookID: String
      cover: String
      status: String
    ): BookResponse
    register(username: String, email: String, password: String): Ok
    login(email: String, password: String): LoginResponse
    changeStatus(id: String, status: String): BookResponse
    deleteBook(id: String): Ok
  }
`;

module.exports = schema;
