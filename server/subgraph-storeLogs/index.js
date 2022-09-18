const {ApolloServer, gql, AuthenticationError} = require('apollo-server');
const {readFileSync} = require('fs');
const {buildSubgraphSchema} = require('@apollo/subgraph');

const typeDefs = gql(readFileSync(__dirname + '/storeLogs.graphql', {encoding: 'utf-8'}));
const resolvers = require(__dirname + '/resolvers');
const BigCommerceStoreLogsAPI = require(__dirname + '/datasources/storeLogs');

const server = new ApolloServer({
  schema: buildSubgraphSchema({typeDefs, resolvers}),
  dataSources: () => {
    return {
      BigCommerceStoreLogsAPI: new BigCommerceStoreLogsAPI()
    };
  },
  context: async ({}) => {
    //if (!id) throw new AuthenticationError('You must be logged in'); // see line 1 in resolvers
  }
});

const port = 4009;
const subgraphName = 'StoreLogs';

server
  .listen({ port: process.env.PORT || port })
  .then(({url}) => {
    console.log(`🚀 Subgraph ${subgraphName} running at ${url}`);
  })
  .catch(err => {
    console.error(err);
  });