import express from "express";
import { ApolloServer } from "apollo-server-express";
import { resolvers } from "./resolvers.js";
import mongoose from "mongoose";
import fs from "fs";

const app = express();
const PORT = 4000;

mongoose.connect(
  "mongodb+srv://advancedfsp:<PASSWORD_REMOVED>@cluster0.jjlpfjh.mongodb.net/?retryWrites=true&w=majority",
  { useNewUrlParser: true }
);

mongoose.connection.on("connected", () => {
  console.log("Connected to database");
});

const server = new ApolloServer({
  typeDefs: fs.readFileSync("./schema.graphql", "utf-8"),
  resolvers,
});

server.start().then(() => {
  server.applyMiddleware({ app, path: "/graphql" });
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
});
