import { ApolloServer } from '@apollo/server';
import { startStandaloneServer } from '@apollo/server/standalone';
import { addMocksToSchema } from '@graphql-tools/mock';
import { makeExecutableSchema } from '@graphql-tools/schema';
import responseCachePlugin from '@apollo/server-plugin-response-cache';
const typeDefs = `
type Price{
    old:String @deprecated(reason: "Use newField."),
    newField:String
    price:Int 
  }
  type Query {
    price: [Price]
  }
`
const price = [
        {price:'100'},
        {price:'200'}
    
]
const resolvers = {
    Query: {
       price:() => price    
  },
  
}

const server = new ApolloServer({
  typeDefs,resolvers
  });
  
  const { url } = await startStandaloneServer(server, {
    listen: { port: 4000 },
  });
  console.log("listening")
