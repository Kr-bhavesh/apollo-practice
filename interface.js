import { ApolloServer } from '@apollo/server';
import { startStandaloneServer } from '@apollo/server/standalone';
const typeDefs=`
union SearchResult = Book | Author

type Book {
  title: String!
}

type Author {
  name: String!
}

type Query {
  search(contains: String): [SearchResult!]
}
interface Human {
  id: ID!
  name: String!
  age: Int!
}

type Man implements Human {
  id: ID!
  name: String!
  age: Int!
  eng:String
}

type Women implements Human {
  id: ID!
  name: String!
  age: Int!
  doc: String
}

# Define a query to retrieve animals
type Query {
  humans: [Human!]!
}
`
 const Book = [{title:"harry"},
{title:"harry part 7"}]
 const Author =[{name:"JK"},
{name:"harry smith"}]

const resolvers = {
  Query: {
    humans: () => {
      return [
        { id: "1", name: "harry", age: 21,eng:"it"},
        { id: "2", name: "Will", age: 22,doc:"dent"},
      ];
    },
  },
  Human: {
    __resolveType(humans) {
      if (humans.eng) {
        return "Man";
      } else if (humans.doc) {
        return "Women";
      }
      return null; 
    },
  },
};


  

const server = new ApolloServer({
    typeDefs,
    resolvers,
  });
  
  const { url } = await startStandaloneServer(server, {
    listen: { port: 4000 },
  });
  
  console.log(`Server ready at: ${url}`);