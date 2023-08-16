import gql from 'graphql-tag'

export const ADD_CART = gql`
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