import { ApolloServer } from '@apollo/server';
import { startStandaloneServer } from '@apollo/server/standalone';
import mongoose from "mongoose";
import typeDefs from "./graphql/typeDefs.js";
import resolvers from "./graphql/resolvers.js";
import { configDotenv } from 'dotenv';
import context from './context/context.js';
configDotenv();
console.log(process.env.JWT_PRIVATE_KEY);
const MONGO_URI=process.env.MONGO_URI
mongoose.connect(MONGO_URI,).then(console.log("db connected"))
const server = new ApolloServer({
    typeDefs,
    resolvers,
    includeStacktraceInErrorResponses:false
  });
const { url } = await startStandaloneServer(server, {
    listen: { port: process.env.PORT },
    context:context
 },);
      console.log("listening");