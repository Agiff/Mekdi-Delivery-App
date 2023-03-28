import { ApolloClient, InMemoryCache, ApolloProvider, gql } from '@apollo/client';

const client = new ApolloClient({
  uri: 'https://mekdi.seirei.site/',
  cache: new InMemoryCache(),
});

export default client