import gql from "graphql-tag";


export const REGISTER = gql`
    mutation register($username: String, $email: String, $password: String) {
        register(username: $username, email: $email, password: $password) {
            message
        }
    }
`;

export const LOGIN = gql`
    mutation login($email: String, $password: String) {
        login(email: $email, password: $password) {
            token
        }
    }
`;
