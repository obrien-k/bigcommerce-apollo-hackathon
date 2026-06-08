# Catalog Subgraph (placeholder)

This subgraph is intentionally a thin placeholder. The full [BigCommerce
Catalog API](https://developer.bigcommerce.com/graphql-api-reference) is large
and store-specific -- mapping it here up front would mean inheriting someone
else's product model instead of building your own.

## What's here

- A minimal `CatalogPlaceholder` query that proves the subgraph is wired into
  the gateway and the federated graph.
- A `BigCommerceCatalogAPI` REST datasource already configured with the
  `X-Auth-Token` handshake and store-hash base URL, ready to point at real
  catalog endpoints (e.g. `catalog/products`).

## Next steps

Replace `catalog.graphql`, `resolvers.js`, and the datasource's placeholder
method with types and queries shaped to your storefront's actual product model.
