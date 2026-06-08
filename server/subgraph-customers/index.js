const { ApolloServer, gql } = require('apollo-server');
const { readFileSync } = require('fs');
const { buildSubgraphSchema } = require('@apollo/subgraph');

const typeDefs = gql(readFileSync(__dirname + '/customers.graphql', { encoding: 'utf-8' }));
const resolvers = require(__dirname + '/resolvers');
const BigCommerceCustomersAPI = require(__dirname + '/datasources/customers');

const server = new ApolloServer({
  schema: buildSubgraphSchema({ typeDefs, resolvers }),
  dataSources: () => ({
    BigCommerceCustomersAPI: new BigCommerceCustomersAPI()
  }),
  context: async ({ req }) => ({
    email: req.headers.email,
    pass: req.headers.pass
  })
});

const port = 4002;
const subgraphName = 'Customers';

server
  .listen({ port: process.env.PORT || port })
  .then(({ url }) => {
    console.log(`🚀 Subgraph ${subgraphName} running at ${url}`);
  })
  .catch(err => {
    console.error(err);
  });
