const express = require('express');
// const restify = require('restify');
const { connectDB } = require('./config/db')
const { graphqlHTTP } = require('express-graphql')
const { schema } = require('./schema/schema')
require('dotenv').config();
const cors = require('cors');

const app = express();

app.use(cors())
// const app = restify.createServer({
//     name: 'graphql-App'
// }) 
const PORT = process.env.PORT || 4000;

connectDB();
app.use('/graphql', graphqlHTTP({
    schema,
    graphiql: true
}))

// app.post('/graphql', cors(), graphqlHTTP({
//     schema,
//     graphiql: true
// }))

const server = app.listen(PORT, () => {
    console.log('server is running and listening on port %s', server.address().port);
}) 