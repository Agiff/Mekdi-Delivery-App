const { ApolloServer } = require('@apollo/server');
const { startStandaloneServer } = require('@apollo/server/standalone');
const { typeDefs: itemTypeDefs, resolvers: itemResolvers } = require('./schema/ItemSchema');

const server = new ApolloServer({
  typeDefs: [itemTypeDefs],
  resolvers: [itemResolvers],
  introspection: true
});

startStandaloneServer(server, {
  listen: { port: 4000 },
})
  .then(({url}) => console.log(`🚀  Server ready at: ${url}`));