
import gql from 'graphql-tag'

export const GET_PRODUCTS = gql`
query {
  products {
    id
    name
    description
    warranty
    price
    avatarUrl 
  }
} ` 
