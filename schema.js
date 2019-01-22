const apollo = require("apollo-server");

const schema = apollo.gql`
    type Query {
        message: String,
        allBooks: [Book],
        me(id: String): User
    },
    type Mutation {
        addBook(title: String, authors: [String],bookID: String, cover: String ,status: String): BookResponse,
        register(username: String, email: String, password: String): Message,
        login(email: String, password: String): Token,
        changeStatus(id: String, status: String): BookResponse,
        deleteBook(id: String): Message
    },
    type Book {
        _id: String,
        title: String,
        bookID: String,
        status: String,
        cover: String,
        authors: [String]
    },
    type BookResponse {
        book: Book,
        message: String
    },
    type User {
        _id: String,
        username: String,
        email: String,
        books: [Book]
    }
    type Token {
        token: String
    },
    type Message {
        message: String
    }
    type Exist {
        exists: Boolean,
        status: String,
        id: String
    }
`;

module.exports = schema;
