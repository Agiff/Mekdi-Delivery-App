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

export const GET_ITEMS_BY_CATEGORY = gql`
  query GetItemsByCategory($category: String!) {
    getItemsByCategory(category: $category) {
      id
      name
      price
      imgUrl
    }
  }
`;

export const GET_CATEGORIES = gql`
  query GetCategories {
    getCategories {
      id
      name
    }
  }
`;