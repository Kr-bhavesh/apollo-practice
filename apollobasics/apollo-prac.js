import { ApolloServer } from '@apollo/server';
import { startStandaloneServer } from '@apollo/server/standalone';
const typeDefs = `
type Demo{
  name:String,
  value:Int
}
enum CacheControlScope {
  PUBLIC,
  PRIVATE
}
type Book{
  author:String,
  id:String,
  title: String!
}
type Price{
    newField:String
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
    resolved: String
    demo:Demo
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
const resolvers = {
    Query: {
      books: () => books,
      price:() => price,
      resolved: () => 'resolved',
    
  },
  
}

const server = new ApolloServer({
  typeDefs,resolvers
  });
  
  const { url } = await startStandaloneServer(server, {
    listen: { port: 4000 },
  });
  console.log("listening")
