const axios = require('axios');
const { entityUrl, userUrl, redis } = require('../config');

const typeDefs = `#graphql
  type Item {
    id: ID
    name: String
    description: String
    price: Int
    imgUrl: String
    category: Category
    ingredients: [Ingredient]
    user: User
  }

  type Category {
    id: ID
    name: String
  }

  type Ingredient {
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

  type SuccessMessage {
    message: String
  }

  input newItem {
    name: String
    description: String
    price: Int
    imgUrl: String
    categoryId: Int
    UserMongoId: String
    ingredients: [newIngredient]
  }

  input newIngredient {
    name: String
  }

  type Query {
    getItems: [Item]
    findItem(id: ID!): Item
    getItemsByCategory(category: String!): [Item]
  }

  type Mutation {
    createItem(newItem: newItem): SuccessMessage
    updateItem(id: ID!, newItem: newItem): SuccessMessage
    deleteItem(id: ID!): SuccessMessage
  }
`;

const resolvers = {
  Query: {
    getItems: async () => {
      try {
        const itemCache = await redis.get('app:items');
        if (itemCache) return JSON.parse(itemCache);
        const { data: items } = await axios.get(entityUrl + 'items');
        const { data: users } = await axios.get(userUrl + 'users');
        const newItems = items.map(item => {
          const user = users.find(el => el._id === item.UserMongoId);
          if (user) item.user = { ...user, id: user._id };
          item.category = item.Category;
          item.ingredients = item.Ingredients;
          return item;
        });
        await redis.set('app:items', JSON.stringify(newItems), 'EX', 600);
        return newItems;
      } catch (error) {
        throw error;
      }
    },
    findItem: async (_, { id }) => {
      try {
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
    getItemsByCategory: async (_, { category }) => {
      try {
        const itemCache = await redis.get('app:items:' + category);
        if (itemCache) return JSON.parse(itemCache);
        const { data: items } = await axios.get(entityUrl + 'items');
        const { data: users } = await axios.get(userUrl + 'users');
        const newItems = items.map(item => {
          const user = users.find(el => el._id === item.UserMongoId);
          if (user) item.user = { ...user, id: user._id };
          item.category = item.Category;
          item.ingredients = item.Ingredients;
          return item;
        }).filter(item => item.category.name === category);
        await redis.set('app:items:' + category, JSON.stringify(newItems), 'EX', 600);
        return newItems;
      } catch (error) {
        throw error;
      }
    }
  },
  Mutation: {
    createItem: async (_, { newItem }) => {
      try {
        const { name, description, price, imgUrl, categoryId, UserMongoId, ingredients } = newItem;
        const newIngredients = ingredients.map(el => el.name);
        const { data: response } = await axios.post(entityUrl + 'items', {
          name,
          description,
          price,
          imgUrl,
          categoryId,
          UserMongoId,
          ingredients: newIngredients,
        });
        await redis.flushall();
        return response;
      } catch (error) {
        throw error;
      }
    },
    updateItem: async (_, { id, newItem }) => {
      try {
        const { name, description, price, imgUrl, categoryId, UserMongoId, ingredients } = newItem;
        const newIngredients = ingredients.map(el => el.name);
        const { data: response } = await axios.put(entityUrl + 'items/' + id, {
          name,
          description,
          price,
          imgUrl,
          categoryId,
          UserMongoId,
          ingredients: newIngredients,
        });
        await redis.flushall();
        return response;
      } catch (error) {
        throw error;
      }
    },
    deleteItem: async (_, { id }) => {
      try {
        const { data: response } = await axios.delete(entityUrl + 'items/' + id);
        await redis.flushall();
        return response;
      } catch (error) {
        throw error;
      }
    }
  }
};

module.exports = { typeDefs, resolvers };