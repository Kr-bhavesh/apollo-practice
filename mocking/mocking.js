import { ApolloServer } from '@apollo/server';
import { startStandaloneServer } from '@apollo/server/standalone';
import { addMocksToSchema } from '@graphql-tools/mock';
import { makeExecutableSchema } from '@graphql-tools/schema';
const typeDefs = `
type Demo{
  name:String,
  value:Int
}
type Query {
 demo:Demo
}`
const resolvers = {}
const mocks = {
    name:"hello",
    value:19
}
const server = new ApolloServer({
    schema: addMocksToSchema({
    schema: makeExecutableSchema({ typeDefs, resolvers }),
    mocks,
    preserveResolvers: true
    }),
    });
    
    const { url } = await startStandaloneServer(server, {
      listen: { port: 4000 },
    });
    console.log("listening")