const axios = require('axios');
const { userUrl, redis } = require('../config');

const typeDefs = `#graphql
  type User {
    id: ID
    username: String
    email: String
    role: String
    phoneNumber: String
    address: String
  }

  type SuccessCreate {
    acknowledged: Boolean
    insertedId: String
  }

  type SuccessDelete {
    acknowledged: Boolean
    deletedCount: Int
  }

  input newUser {
    username: String
    password: String
    email: String
    role: String
    phoneNumber: String
    address: String
  }

  type Query {
    getUsers: [User]
    findUser(id: ID!): User
  }

  type Mutation {
    createUser(newUser: newUser): SuccessCreate
    deleteUser(id: ID!): SuccessDelete
  }
`;

const resolvers = {
  Query: {
    getUsers: async () => {
      try {
        const userCache = await redis.get('app:users');
        if (userCache) return JSON.parse(userCache);
        const { data: users } = await axios.get(userUrl + 'users');
        const newUsers = users.map(el => {
          el.id = el._id;
          return el;
        });
        await redis.set('app:users', JSON.stringify(newUsers), 'EX', 600);
        return newUsers;
      } catch (error) {
        throw error;
      }
    },
    findUser: async (_, { id }) => {
      try {
        const { data: user } = await axios.get(userUrl + 'users/' + id);
        return user;
      } catch (error) {
        throw error;
      }
    },
  },
  Mutation: {
    createUser: async (_, { newUser }) => {
      try {
        const { username, password, email, role, phoneNumber, address } = newUser;
        const { data: response } = await axios.post(userUrl + 'users', {
          username,
          password,
          email,
          role,
          phoneNumber,
          address
        });
        await redis.del('app:users');
        return response;
      } catch (error) {
        throw error;
      }
    },
    deleteUser: async (_, { id }) => {
      try {
        const { data: response } = await axios.delete(userUrl + 'users/' + id);
        await redis.del('app:users');
        return response;
      } catch (error) {
        throw error;
      }
    }
  }
};

module.exports = { typeDefs, resolvers };