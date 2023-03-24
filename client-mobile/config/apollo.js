import { ApolloClient, InMemoryCache, ApolloProvider, gql } from '@apollo/client';

const client = new ApolloClient({
  uri: 'https://7132-103-147-8-244.ap.ngrok.io',
  cache: new InMemoryCache(),
});

export default client