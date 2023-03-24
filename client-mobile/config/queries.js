import { gql } from '@apollo/client';

export const GET_ITEMS = gql`
  query GetItems {
    getItems {
      id
      name
      price
      imgUrl
    }
  }
`;

export const GET_ITEM_DETAIL = gql`
  query FindItem($findItemId: ID!) {
    findItem(id: $findItemId) {
      id
      name
      description
      price
      imgUrl
      category {
        name
      }
      ingredients {
        id
        name
      }
      user {
        username
      }
    }
  }
`;