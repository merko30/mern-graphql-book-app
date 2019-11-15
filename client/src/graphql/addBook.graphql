import gql from 'graphql-tag';

const addBook = gql`
    mutation addBook(
        $title: String,
        $bookID: String,
        $status: String,
        $cover: String,
        $authors: [String]) {
        addBook(
            title: $title,
            bookID: $bookID, 
            status: $status, 
            authors: $authors, 
            cover: $cover) {
            message,
            book {
                _id,
                authors,
                title,
                bookID,
                cover,
                status
            }
            }
        }
    `;

export default addBook