import gql from 'graphql-tag'

export const LOGIN_USER = gql`
    mutation loginUser($email: String!,  $password: String!) {
        loginUser (input: { email: $email,  password: $password }) {
            id
            email
            firstName
            lastName
            userName
            gender
            avatar
            tokenData {
                token
                refreshToken
            }
        }
    }`

export const REGISTER_USER = gql`
    mutation addUser($email: String!, $password: String!, $firstName: String!, $lastName: String!, $gender: String!, $avatar: String!) {
        addUser(input: { firstName: $firstName, lastName: $lastName, email: $email, password: $password, gender: $gender, avatar: $avatar}) {
            id
            firstName
            lastName 
            email
            gender
            avatar 
        }
    }`



