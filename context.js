import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from '@apollo/server/standalone';
import { GraphQLError } from 'graphql';

const typeDefs = `#graphql
  type Query {
    userWithID(id: ID!): User
  }

  type User {
    id: ID!
  }
`;

const resolvers = {
  Query: {
    userWithID: (_, args) => {
      
      if (args.id < 1) {
        throw new GraphQLError('Invalid argument value', {
          extensions: {
            code: 'BAD_USER_INPUT',
            argumentName:'id'
          },
        });
      }
      
      // ...fetch correct user...
    },
  },
};
const server = new ApolloServer({
    typeDefs,
    resolvers,
    includeStacktraceInErrorResponses:true
  });
  
  // Launch the server
  const { url } = await startStandaloneServer(server);
  
  console.log(`Server listening at: ${url}`);
