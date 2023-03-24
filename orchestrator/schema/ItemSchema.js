const axios = require('axios');
const { entityUrl, userUrl } = require('../config');

const typeDefs = `#graphql
  type Item {
    id: ID
    name: String
    description: String
    price: Int
    imgUrl: String
    category: Category
    ingredients: [Ingredients]
    user: User
  }

  type Category {
    id: ID
    name: String
  }

  type Ingredients {
    id: ID
    name: String
  }

  type User {
    id: ID
    username: String
    email: String
    role: String
    phoneNumber: String
    address: String
  }

  type Query {
    getItems: [Item]
    findItem(id: ID!): Item
  }
`;

const resolvers = {
  Query: {
    getItems: async () => {
      try {
        const { data: items } = await axios.get(entityUrl + 'items');
        const { data: users } = await axios.get(userUrl + 'users');
        return items.map(item => {
          const user = users.find(el => el._id === item.UserMongoId);
          if (user) item.user = { ...user, id: user._id };
          item.category = item.Category;
          item.ingredients = item.Ingredients;
          return item;
        });
      } catch (error) {
        throw error;
      }
    },
    findItem: async (_, args) => {
      try {
        const { id } = args;
        const { data: item } = await axios.get(entityUrl + 'items/' + id);
        const { data: user } = await axios.get(userUrl + 'users/' + item.UserMongoId);
        item.category = item.Category;
        item.ingredients = item.Ingredients;
        item.user = user;
        return item;
      } catch (error) {
        throw error;
      }
    },
  },
};

module.exports = { typeDefs, resolvers };