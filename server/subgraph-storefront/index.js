const {ApolloServer, gql, AuthenticationError} = require('apollo-server');
const {readFileSync} = require('fs');
const {buildSubgraphSchema} = require('@apollo/subgraph');

const typeDefs = gql(readFileSync(__dirname + '/storefront.graphql', {encoding: 'utf-8'}));
const resolvers = require(__dirname + '/resolvers');
const BigCommerceStorefrontAPI = require(__dirname + '/datasources/storefront');
const BigCommerceLogin = require(__dirname + '/datasources/bigcommerce-gql.js');

const server = new ApolloServer({
  schema: buildSubgraphSchema({typeDefs, resolvers}),
  dataSources: () => {
    return {
      BigCommerceStorefrontAPI: new BigCommerceStorefrontAPI(),
      BigCommerceLogin: new BigCommerceLogin()
    };
  },
  context: async ({req}) => {
    const auth = req.headers.authorize || ''
    /* don't need yet, but will
    const email = req.headers.email || ''; // bigc email for customer
    const pass = req.headers.pass || ''; // bigc pass for customer
    */
    const jwt = req.headers.jwt || ''; // I don't think this will be seen in the headers
    // Get the user token after "Bearer"
    // const id = token.split(' ')[1]; // e.g., "user-1"
    //if (auth, email, pass, jwt) { // clean this up, assign userId to a var and start using real data.. attempt 1
    //  return {user: {authorize: id, userEmail:req.headers.userEmail}, jwt}
    //}
    //if (!id) throw new AuthenticationError('You must be logged in'); // see line 1 in resolvers
  }
});

const port = 4001;
const subgraphName = 'Storefront';

server
  .listen({ port: process.env.PORT || port })
  .then(({url}) => {
    console.log(`🚀 Subgraph ${subgraphName} running at ${url}`);
  })
  .catch(err => {
    console.error(err);
  });