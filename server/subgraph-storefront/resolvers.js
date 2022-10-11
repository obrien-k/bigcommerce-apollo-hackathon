const { AuthenticationError } = require("apollo-server"); // Def need to figure out auth/users 

const resolvers = {
  Query: {
    /* Returns JWT for use with BigCommerce Storefront API 
    // Intention is to return this as an Entity @key field
    // and use to make other requests within subgraphs   */
    StorefrontToken: async (_, { allowed_cors_origins, channel_id, expires_at }, { dataSources }) => {
      return dataSources.BigCommerceStorefrontAPI.getStorefrontToken(allowed_cors_origins, channel_id, expires_at);
    },
    BigCommerceLogin: async (_, { authorization }, { dataSources }) => {
      return dataSources.BigCommerceLogin.getLogin(authorization);
    }
  }
};

module.exports = resolvers;