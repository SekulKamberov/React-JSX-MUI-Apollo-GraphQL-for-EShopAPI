
import gql from 'graphql-tag'

export const GET_STORES = gql`
query {
  stores {
    id
    userId
    name
    description
    phoneNumber
    address
    createdAt
    avatarUrl 
    products {
        id
        name
        description
        warranty
        price
        avatarUrl 
    }  
  }
} ` 
