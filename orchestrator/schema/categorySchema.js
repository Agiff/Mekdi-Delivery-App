const axios = require('axios');
const { entityUrl } = require('../config');

const typeDefs = `#graphql
  type Category {
    id: ID
    name: String
  }

  type Query {
    getCategories: [Category]
  }
`;

const resolvers = {
  Query: {
    getCategories: async () => {
      try {
        const { data: categories } = await axios.get(entityUrl + 'categories');
        return categories;
      } catch (error) {
        throw error;
      }
    }
  }
};

module.exports = { typeDefs, resolvers };