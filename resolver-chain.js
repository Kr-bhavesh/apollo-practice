import { ApolloServer } from '@apollo/server';
import { startStandaloneServer } from '@apollo/server/standalone';

const libraries = [
  {
    branch: 'downtown',
  },
  {
    branch: 'riverside',
  },
];
const books = [
  {
    title: 'The Awakening',
    author: 'Kate Chopin',
    branch: 'riverside',
  },
  {
    title: 'City of Glass',
    author: 'Paul Auster',
    branch: 'downtown',
  },
];

// Schema definition
const typeDefs = `
  type Library {
    branch: String!
    books: [Book!]
  }
  type Book {
    title: String!
    author: Author!
  }
  type Author {
    name: String!
  }
  type Query {
    libraries: [Library]
  }
`;

// Resolver map
const resolvers = {
  Query: {
    libraries() {
      return libraries;
    },
  },
  Library: {
    books(parent) {
      return books.filter((book) => book.branch === parent.branch);
    },
  },
  Book: {
    author(parent) {
      return {
        name: parent.author,
      };
    },
  },
};
const server = new ApolloServer({
  typeDefs,
  resolvers,
});

// Launch the server
const { url } = await startStandaloneServer(server);

console.log(`Server listening at: ${url}`);