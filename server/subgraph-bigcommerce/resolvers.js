const { AuthenticationError } = require("apollo-server"); //unused but needs to be

const resolvers = {
  Query: {
    // returns account A&A
    bigCommerceLogin: async (_, {email, pass}, {dataSources}) => {
      return dataSources.BigCommerceLogin.getLogin(email, pass);
    },
    bigCommerceRestAPI: async (_, {allowed_cors_origins, channel_id, expires_at}, {dataSources}) => {
      return dataSources.bigCommerceRestAPI.postToken(email, pass);
    }
  }
};

module.exports = resolvers;