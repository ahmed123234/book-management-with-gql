const { ApolloServer } = require('@apollo/server');
const express = require('express')
const { typeDefs, resolvers } = require('./schema')

const app = express();
const server = new ApolloServer({
  typeDefs,
  resolvers,
});

server.applyMiddleware({ app });

const PORT = 4040;

app.listen(PORT, () => {
    console.log("server is running and listening on port %s", server.address().port);
})