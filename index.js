import { ApolloServer } from '@apollo/server';
import { startStandaloneServer } from '@apollo/server/standalone';
import mongoose from "mongoose";
import typeDefs from "./graphql/typeDefs.js";
import resolvers from "./graphql/resolvers.js";
import { configDotenv } from 'dotenv';
import contexts from "./graphql/contex.js"
configDotenv();
const MONGO_URI=process.env.MONGO_URI
mongoose.connect(MONGO_URI).then(console.log("db connected"))
const server = new ApolloServer({
    typeDefs,
    resolvers,
    introspection:true
  });
const { url } = await startStandaloneServer(server, {
    listen: { port: 4000 },
    context:contexts
  });
  console.log("listening");