if (process.env.NODE_ENV !== 'production') require('dotenv').config();

const { ApolloServer } = require('@apollo/server');
const { startStandaloneServer } = require('@apollo/server/standalone');
const { typeDefs: itemTypeDefs, resolvers: itemResolvers } = require('./schema/ItemSchema');
const { typeDefs: userTypeDefs, resolvers: userResolvers } = require('./schema/UserSchema');
const { typeDefs: categoryTypeDefs, resolvers: categoryResolvers } = require('./schema/categorySchema');

const server = new ApolloServer({
  typeDefs: [itemTypeDefs, userTypeDefs, categoryTypeDefs],
  resolvers: [itemResolvers, userResolvers, categoryResolvers],
  introspection: true
});

startStandaloneServer(server, {
  listen: { port: 4000 },
})
  .then(({url}) => console.log(`🚀  Server ready at: ${url}`));