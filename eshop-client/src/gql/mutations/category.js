import gql from 'graphql-tag'

export const ADD_CATEGORY = gql`
mutation addCategory($name: String!) {
        addCategory (input: { name: $name }) {
            id
            name 
        }
}`

export const DELETE_CATEGORY = gql`
mutation deleteCategory($id: String!) {
    deleteCategory(input: { id: $id }) {
        id
    }
}`

export const EDIT_CATEGORY = gql`
mutation editCategory($id: String!, $name: String!) {
        editCategory (input: { id: $id,  name: $name }) {
            id
            name 
        }
}`