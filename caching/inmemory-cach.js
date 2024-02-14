import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";
import { InMemoryLRUCache } from '@apollo/utils.keyvaluecache';

// Define your GraphQL schema
const typeDefs = `
  type Query {
    hello: String
  }
`;

// Define resolvers
const resolvers = {
  Query: {
    hello: () => 'Hello from apollo'
  },
};

// Create an Apollo Server instance with cache configuration
const server = new ApolloServer({
  typeDefs,
  resolvers,
  cache: new InMemoryLRUCache({
    maxSize: Math.pow(2, 20) * 100,
    // 5 minutes (in seconds)
    ttl: 300,
  }),
});

// Start the server
startStandaloneServer(server, { listen: { port: 4000 } })
  .then(({ url }) => {
    console.log(`server ready at: ${url}`);
  })
  .catch(err => {
    console.error('Error starting server:', err);
  });