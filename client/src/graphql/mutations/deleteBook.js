import gql from 'graphql-tag';

const deleteBook = gql`
    mutation deleteBook($id: String) {
        deleteBook(id: $id) {
            message
        }
    }`;

export default deleteBook