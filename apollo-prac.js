import { ApolloServer } from '@apollo/server';
import { startStandaloneServer } from '@apollo/server/standalone';



// A schema is a collection of type definitions (hence "typeDefs")
// that together define the "shape" of queries that are executed against
// your data.
const typeDefs = `
type Book {
  name:String,
  id:String,
  title: String!
}
  type Price{
    price:Int
  }
  type User{
    id:ID!
  }
  enum AllowedColor {
    RED
    GREEN
    BLUE
  
  }
  type Query {
    price: [Price],
    books: [Book],
    uid(id:ID!):User,
    favoriteColor: AllowedColor 
    avatar(borderColor: AllowedColor): String 
  }
`
const books = [
    {
      id:'101',
      title: 'The Awakening',
      author: 'Kate Chopin',
    },
    {
      id:'102',
      title: 'City of Glass',
      author: 'Paul Auster',
    },
  ];

const price = [
        {price:'100'},
        {price:'200'}
    
]

// const dateScalar = new GraphQLScalarType({

//     name: 'Date',
  
//     description: 'Date custom scalar type',
  
//     serialize(value) {
  
//       if (value instanceof Date) {
  
//         return value.getTime(); 
//       }
  
//       throw Error('GraphQL Date Scalar serializer expected a `Date` object');
  
//     },
  
//     parseValue(value) {
  
//       if (typeof value === 'number') {
//         return new Date(value); 
//       }
  
//       throw new Error('GraphQL Date Scalar parser expected a `number`');
  
//     },
  
//     parseLiteral(ast) {
  
//       if (ast.kind === Kind.INT) {
//         return new Date(parseInt(ast.value, 10));
  
//       }
//       return null;
  
//     },
  
//   });
const resolvers = {
    Query: {
      books: () => books,
      price:() => price,
  },
  
}

const server = new ApolloServer({
    typeDefs,
    resolvers,
  });
  
  const { url } = await startStandaloneServer(server, {
    listen: { port: 4000 },
  });
  console.log("listening")
