// client.js
import { ApolloClient, InMemoryCache, HttpLink } from '@apollo/client';

// Apollo Client setup
const client = new ApolloClient({
  link: new HttpLink({
    uri: 'https://stg-wparena-staging.kinsta.cloud/graphql', // replace with your GraphQL API URL
  }),
  cache: new InMemoryCache(), // Cache for API responses
});

export default client;
