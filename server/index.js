require('dotenv').config()
const { ApolloServer } = require('apollo-server');
const { ApolloGateway, RemoteGraphQLDataSource } = require('@apollo/gateway');
const { buildSubgraphSchema } = require('@apollo/subgraph');
const { readFileSync } = require('fs');

const supergraphSdl = readFileSync(__dirname + '/supergraph.graphql').toString();

class AuthenticatedDataSource extends RemoteGraphQLDataSource {
  willSendRequest({ request, context }) {
    // Might need to move this to customer subgraph.. depends on data structure.
    // Pass the user's id from the context to each subgraph
    // as a header called `email` and 'pass'
    request.http.headers.set('email', context.email);
    request.http.headers.set('pass', context.pass);
  }
}

const gateway = new ApolloGateway({
  supergraphSdl,
  buildService({ name, url }) {
    return new AuthenticatedDataSource({ url });
  },
});

const server = new ApolloServer({
  gateway,
  subscriptions: false,
  context: async ({req}) => {
    const bigc_email = req.headers.email;
    const bigc_pass = req.headers.pass || '';
    const token = req.headers.authorization; //shouldn't need this? I'm generating the token?
    console.log(token);
    if (bigc_pass) { // clean this up, assign userId to a var and start using real data
      return {BigcLogin: {email: bigc_email, pass: bigc_pass}}
    }
    if (!bigc_pass) { // guest account for not logged in
      return { token }
    }
  }
});



server.listen({port: process.env.PORT || 4000}).then(({ url }) => {
  console.log(`🚀 Gateway ready at ${url}`);
}).catch(err => {console.error(err)});