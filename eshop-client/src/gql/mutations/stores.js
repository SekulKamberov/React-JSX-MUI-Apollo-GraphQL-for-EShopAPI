import gql from 'graphql-tag'

export const ADDSTORE = gql`
mutation addStore($name: String!,  $address: String!,  $phoneNumber: String!,  $description: String!,  $avatarUrl: String!) {
    addStore (input: { name: $name,  address: $address,  phoneNumber: $phoneNumber,  description: $description,  avatarUrl: $avatarUrl }){
        name
        address
        phoneNumber
        description
        avatarUrl
    }
}`

export const DELETE_STORE = gql`
mutation deleteStore($id: String!) {
    deleteStore(input: { id: $id }) {
        bool
    }
}`

export const EDIT_STORE = gql`
    mutation updateStore($id: String!, $name: String!,  $address: String!,  $phoneNumber: String!,  $description: String!,  $avatarUrl: String!) {
        updateStore(input: { id: $id, name: $name,  address: $address,  phoneNumber: $phoneNumber,  description: $description,  avatarUrl: $avatarUrl }) {
            id
            name
            address
            phoneNumber
            description
            avatarUrl
        }
    }`