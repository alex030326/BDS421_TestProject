import { ApolloClient, InMemoryCache } from '@apollo/client';

const client = new ApolloClient({
    uri: 'http://localhost:3000/graphql', // Verbindung zum Backend
    cache: new InMemoryCache(),
});

export default client;
