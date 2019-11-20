const apollo = require("apollo-server");

const schema = apollo.gql`
    type Query {
        message: String,
        me(id: String): MeResponse
        counts: Counts
    },
    type Mutation {
        addBook(title: String, authors: [String],bookID: String, cover: String ,status: String): BookResponse,
        register(username: String, email: String, password: String): Ok,
        login(email: String, password: String): LoginResponse,
        changeStatus(id: String, status: String): BookResponse,
        deleteBook(id: String): Ok
    },
    type Book {
        _id: String,
        title: String,
        bookID: String,
        status: String,
        cover: String,
        authors: [String]
    },
    type Counts {
        wishlistCount: Int,
        readCount: Int,
        readingCount: Int
    },
    type BookResponse {
        book: Book,
        message: String
    },
    type MeResponse {
        _id: String
        username: String
        email: String
        books: [Book]
        wishlistCount: Int
        readCount: Int
        readingCount: Int
    }
    type LoginResponse {
        token: String,
        user: MeResponse
    },
    type Ok {
        ok: Boolean
    }
    type Exist {
        exists: Boolean,
        status: String,
        id: String
    }
`;

module.exports = schema;
