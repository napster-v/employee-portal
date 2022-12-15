import express from "express";
import {ApolloServer} from "apollo-server-express";
import {typeDefs} from "./typedefs.js";
import {resolvers} from "./resolvers.js";
import mongoose from "mongoose";

const app = express();
const PORT = 4000;

mongoose.connect('mongodb+srv://advancedfsp:qEteQu72of0mSMMx@cluster0.jjlpfjh.mongodb.net/?retryWrites=true&w=majority', {useNewUrlParser: true});

mongoose.connection.on("connected", () => {
    console.log("connected to database");
});

const server = new ApolloServer({
    typeDefs,
    resolvers
});

server.start().then(() => {
    server.applyMiddleware({app, path: '/graphql'});
    app.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}`);
    });
});