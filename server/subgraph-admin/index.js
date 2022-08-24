const {ApolloServer, gql, AuthenticationError} = require('apollo-server');
const {readFileSync} = require('fs');
const {buildSubgraphSchema} = require('@apollo/subgraph');

const typeDefs = gql(readFileSync(__dirname + '/admin.graphql', {encoding: 'utf-8'}));
const resolvers = require(__dirname + '/resolvers');
const AdminSource = require(__dirname + '/datasources/admin');

const server = new ApolloServer({
  schema: buildSubgraphSchema({typeDefs, resolvers}),
  dataSources: () => {
    return {
      AdminSource: new AdminSource()
    };
  },
  context: async ({req}) => {
    const id = req.headers.userid || ''; // e.g., "Bearer user-1"
    // Get the user token after "Bearer "
    //const id = token.split(' ')[1]; // e.g., "user-1"
    if (id) { // clean this up, assign userId to a var and start using real data
      return {user: {userId: id, userRole:req.headers.userrole}}
    }
    //if (!id) throw new AuthenticationError('You must be logged in');
  }
});

const port = 4001;
const subgraphName = 'admin';

server
  .listen({ port: process.env.PORT || port })
  .then(({url}) => {
    console.log(`🚀 Subgraph ${subgraphName} running at ${url}`);
  })
  .catch(err => {
    console.error(err);
  });