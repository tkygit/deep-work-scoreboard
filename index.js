const { ApolloServer } = require('apollo-server');
const mongoose = require('mongoose');

const  { MONGO_DB } = require('./config.js');

const PORT = process.env.PORT || 5000;

const typeDefs = require('./graphql/typeDefs');
const resolvers = require('./graphql/resolvers');

require("./util/passport");

const server = new ApolloServer ({
    typeDefs,
    resolvers,
    context: ({ req, res }) => ({ req, res })
});

mongoose
    .connect(MONGO_DB, { useNewUrlParser: true })
    .then(() => {
        console.log('MongoDB connected')
        return server.listen({ port: PORT} );
    })
    .then((res) => {
        console.log(`Server is running at ${res.url}`)
    })
	.catch((err) => {
		console.log(err);
    });