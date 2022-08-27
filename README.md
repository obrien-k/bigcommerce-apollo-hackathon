# bigcommerce-apollo-hackathon

// CODE INCOMPLETE.

Proof of Concept Apollo Federation / supergraph for entry in BigCommerce's first [BigHackathon](https://twitter.com/hashtag/bighackathon). [What is the supergraph?](https://www.apollographql.com/blog/announcement/backend/the-supergraph-a-new-way-to-think-about-graphql/)

Gateway and BigCommerce subgraph initial structure setup with quirks (e.g. no payload D;).

Starting with Products / Customers subgraph would have resulted in queries to workaround login requirement, but wouldn't have unlocked more of the BigCommerce graph like login or wishlist would (being Mutations).

Contributions are welcome! [There are many types that could be implemented as subgraphs](https://developer.bigcommerce.com/graphql-api-reference).

## Auth subgraph

Tokenization requires a publicly facing IP for stateless login, uses [BigCommerce Storefront Login](https://developer.bigcommerce.com/graphql-playground). I have the same jwt code working somewhere else and understand bcrypt, need to implement them together correctly.

## Products subgraph
// TODO
## Customers subgraph
// TODO
