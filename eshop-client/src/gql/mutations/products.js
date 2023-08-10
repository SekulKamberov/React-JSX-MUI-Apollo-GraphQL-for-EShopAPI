import gql from 'graphql-tag'

export const ADD_PRODUCT = gql`
mutation addProduct($name: String!, $warranty: Int!, 
    $description: String!, $avatarUrl: String!, $price: Int!, 
    $categoryId: String!, $storeId: String!) {
        addProduct (input: { name: $name,  warranty: $warranty,  description: $description, 
        avatarUrl: $avatarUrl, price: $price,  categoryId: $categoryId,  storeId: $storeId }) {
            id
            name
            warranty
            description 
            avatarUrl
            price 
        }
}`

export const DELETE_PRODUCT = gql`
mutation deleteProduct($id: String!) {
    deleteProduct(input: { id: $id }) {
        id
    }
}`

export const EDIT_PRODUCT = gql`
mutation editProduct($name: String!, $warranty: Int!, 
    $description: String!, $avatarUrl: String!, $price: Decimal!, 
    $categoryId: String!, $storeId: String!) {
        editProduct (input: { name: $name,  warranty: $warranty,  description: $description, 
        avatarUrl: $avatarUrl, price: $price,  categoryId: $categoryId,  storeId: $storeId }) {
            id
            name
            warranty
            description
            description
            avatarUrl
            price
            categoryId
            storeId
        }
}`