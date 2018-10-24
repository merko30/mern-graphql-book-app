import gql from 'graphql-tag';

export const ADD_BOOK = gql`
    mutation addBook($title: String, $bookID: String, $status: String,$cover: String, $authors: [String]) {
        addBook(title: $title, bookID: $bookID, status: $status, authors: $authors, cover: $cover) {
            message
        }
    }
`;

export const CHANGE_STATUS = gql`
    mutation changeStatus($id: String, $status: String) {
        changeStatus(id: $id, status: $status) {
            message
        }
    }
`;

export const CHECK = gql`
    query existsInBooks($bookID: String) {
     existsInBooks(bookID: $bookID) {
                exists,
                status,
                id
            }
        
}
`

export const USER_BOOKS = gql`
    {
        me {
            books {
                title,
                authors,
                status,
                bookID,
                _id,
                cover
            }
        }
    }
`;

export const DELETE_BOOK = gql`
    mutation deleteBook($id: String) {
        deleteBook(id: $id) {
            message
        }
    }
`;