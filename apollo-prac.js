import { ApolloServer } from '@apollo/server';
import { startStandaloneServer } from '@apollo/server/standalone';
import { addMocksToSchema } from '@graphql-tools/mock';
import { makeExecutableSchema } from '@graphql-tools/schema';
import responseCachePlugin from '@apollo/server-plugin-response-cache';
const typeDefs = `
type Demo{
  name:String,
  value:Int
}
enum CacheControlScope {
  PUBLIC,
  PRIVATE
}

directive @cacheControl(
  maxAge: Int
  scope: CacheControlScope
) on FIELD_DEFINITION | OBJECT | INTERFACE | UNION
type Book @cacheControl(maxAge:180) {
  name:String,
  id:String,
  title: String!
}
type Price{
    old:String @deprecated(reason: "Use newField."),
    newField:String
    price:Int @cacheControl(maxAge:90)
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
    price: [Price] @cacheControl(maxAge:90),
    books: [Book],
    uid(id:ID!):User,
    favoriteColor: AllowedColor 
    avatar(borderColor: AllowedColor): String 
    resolved: String
    demo:Demo
  }
`
const mocks = {
  Int: () => 6,
  String: () => 'Hello',

};
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
const resolvers = {
    Query: {
      books: () => books,
      price:() => price,
      resolved: () => 'resolved',
    
  },
  
}

const server = new ApolloServer({
  schema: addMocksToSchema({
  schema: makeExecutableSchema({ typeDefs, resolvers }),
  mocks,
  preserveResolvers: true,
  plugins: [responseCachePlugin()]
  }),
  });
  
  const { url } = await startStandaloneServer(server, {
    listen: { port: 4000 },
  });
  console.log("listening")
