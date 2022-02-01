var express = require('express');
var app = express();
var graphqlHttp = require('express-graphql');
var resolvers = require('./resolvers/resolvers');
var schema = require('./schemas/schemas');



app.use('/graphql', graphqlHttp({
    schema: schema,
    rootValue: resolvers, // resolvers end points
    graphiql: true
}))

module.exports = app;