
import gql from 'graphql-tag';

const checkBook = gql`
    query existsInBooks($bookID: String) {
        existsInBooks(bookID: $bookID) {
                exists,
                status,
                id
        }
    }`

export default checkBook