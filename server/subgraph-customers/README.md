# Customers Subgraph (placeholder)

A clean starting point for customer login, account, and impersonation flows --
the kind of thing you'll want to pair with the `StorefrontToken` handshake in
the storefront subgraph.

## What's here

- A minimal `CustomersPlaceholder` query that proves the subgraph is wired
  into the gateway and the federated graph.
- A `BigCommerceCustomersAPI` REST datasource already configured with the
  `X-Auth-Token` handshake and store-hash base URL.
- Gateway-forwarded `email`/`pass` headers already land in `context`, ready
  for use in real login resolvers.

## Next steps

Replace `customers.graphql`, `resolvers.js`, and the datasource's placeholder
method with real customer/account queries and mutations.
