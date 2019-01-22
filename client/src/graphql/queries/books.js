import gql from 'graphql-tag';


const getUsersBooks = gql`
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
    }`;

export default getUsersBooks;
