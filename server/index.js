require('dotenv').config()
const { ApolloServer } = require('apollo-server');
const { ApolloGateway, IntrospectAndCompose, RemoteGraphQLDataSource } = require('@apollo/gateway');

/*
 * Local subgraphs are introspected and composed at startup so the gateway
 * runs immediately with `npm run dev` -- no `rover` CLI or pre-composed
 * supergraph file required. Swap this for a managed-federation `supergraphSdl`
 * (see the `compose-schema` script) once you're ready to run this in production.
 */
const subgraphs = [
  { name: 'storefront', url: process.env.STOREFRONT_SUBGRAPH_URL || 'http://localhost:4001' },
  { name: 'customers', url: process.env.CUSTOMERS_SUBGRAPH_URL || 'http://localhost:4002' },
  { name: 'catalog', url: process.env.CATALOG_SUBGRAPH_URL || 'http://localhost:4003' },
  { name: 'storeLogs', url: process.env.STORELOGS_SUBGRAPH_URL || 'http://localhost:4009' },
];

class AuthenticatedDataSource extends RemoteGraphQLDataSource {
  willSendRequest({ request, context }) {
    // Forward the BigCommerce login / StorefrontToken handshake from the
    // gateway's request context down into each subgraph as headers.
    if (context.email) request.http.headers.set('email', context.email);
    if (context.pass) request.http.headers.set('pass', context.pass);
    if (context.token) request.http.headers.set('authorization', context.token);
  }
}

const gateway = new ApolloGateway({
  supergraphSdl: new IntrospectAndCompose({ subgraphs }),
  buildService({ url }) {
    return new AuthenticatedDataSource({ url });
  },
});

const server = new ApolloServer({
  gateway,
  subscriptions: false,
  csrfPrevention: true,
  cache: 'bounded',
  cors: {
    origin: [process.env.STORE_DOMAIN, process.env.STORE_CANONICAL_URL, 'https://studio.apollographql.com']
  },
  context: async ({ req }) => {
    const bigc_email = req.headers.email;
    const bigc_pass = req.headers.pass;
    const token = req.headers.authorization;

    // Authenticated handshake: BigCommerce login credentials are forwarded so
    // subgraphs (e.g. customers) can mint/validate against the StorefrontToken.
    if (bigc_pass) {
      return { email: bigc_email, pass: bigc_pass };
    }

    // Guest handshake: forward whatever bearer token the client already has.
    return { token };
  }
});

server.listen({ port: process.env.PORT || 4000 }).then(({ url }) => {
  console.log(`🚀 Gateway ready at ${url}`);
}).catch(err => { console.error(err); });
