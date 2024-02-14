import { ApolloServer } from '@apollo/server';
import { startStandaloneServer } from '@apollo/server/standalone';
import { GraphQLScalarType, Kind, GraphQLError } from 'graphql';
const typeDefs = `
  scalar Odd

  type Query {
    echoOdd(odd: Odd!): Odd!
  }
`;
function oddValue(value) {
  if (typeof value === 'number' && Number.isInteger(value) && value % 2 !== 0) {
    return value;
  }
  throw new GraphQLError('Provided value is not an odd integer', {
    extensions: { code: 'BAD_USER_INPUT' },
  });
}

const resolvers = {
  Odd: new GraphQLScalarType({
    name: 'Odd',
    description: 'Odd custom scalar type',
    parseValue: oddValue,
    serialize: oddValue,
    parseLiteral(ast) {
      if (ast.kind === Kind.INT) {
        return oddValue(parseInt(ast.value, 10));
      }
      throw new GraphQLError('Provided value is not an odd integer', {
        extensions: { code: 'BAD_USER_INPUT' },
      });
    },
  }),
  Query: {
    echoOdd(_, { odd }) {
      return odd;
    },
  },
};

const server = new ApolloServer({
  typeDefs,
  resolvers,
});

const { url } = await startStandaloneServer(server);

console.log(`Server listening at: ${url}`);