const { AuthenticationError } = require("apollo-server"); //unused but needs to be

const resolvers = {
  Query: {
    // returns account A&A
   /* bigCommerceLogin: async (_, {email, pass}, {dataSources}) => {
      return dataSources.BigCommerceLogin.getLogin(email, pass);
    },*/
    StorefrontToken: async (_, { allowed_cors_origins, channel_id, expires_at }, { dataSources }) => {
      return dataSources.BigCommerceRestAPI.getStorefrontToken(allowed_cors_origins, channel_id, expires_at);
    },

    // trying store logs (GET instead of POST like above)
    SystemLogs: async (_, __, { dataSources }) => {
      return dataSources.BigCommerceRestAPI.getSystemLogs();
    },

    Products: async (_, __, { dataSources }) => {
      return dataSources.BigCommerceRestAPI.getProducts();
    }

  }
};

module.exports = resolvers;