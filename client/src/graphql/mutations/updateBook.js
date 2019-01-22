import gql from 'graphql-tag';

const updateBook = gql`
    mutation changeStatus($id: String, $status: String) {
        changeStatus(id: $id, status: $status) {
            message,
            book {
                _id,
                status,
                title,
                cover,
                authors,
                bookID
            }
        }
    }
`;

export default updateBook