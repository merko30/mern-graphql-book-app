import gql from 'graphql-tag';

const register = gql`
    mutation register($username: String, $email: String, $password: String) {
        register(username: $username, email: $email, password: $password) {
            message
        }
    }`


export default register