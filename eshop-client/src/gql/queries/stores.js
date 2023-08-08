
import gql from 'graphql-tag'

export const GET_STORES = gql`
query {
  stores {
    id
    name
    description
    phoneNumber
    address
    createdAt
    avatarUrl 
  }
} ` 
