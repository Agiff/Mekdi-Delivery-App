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
    _id: ID
    username: String
    email: String
    role: String
    phoneNumber: String
    address: String
  }

  type Query {
    items: [Item]
  }
`;

const resolvers = {
  Query: {
    items: async () => {
      try {
        const { data: items } = await axios.get(entityUrl + 'items');
        const { data: users } = await axios.get(userUrl + 'users');
        return items.map(item => {
          const user = users.find(el => el._id === item.UserMongoId);
          if (user) item.user = user;
          item.category = item.Category;
          item.ingredients = item.Ingredients;
          return item;
        });
      } catch (error) {
        throw error;
      }
    },
  },
};

module.exports = { typeDefs, resolvers };