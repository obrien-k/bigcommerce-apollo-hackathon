const { AuthenticationError } = require("apollo-server"); //unused but needs to be

const resolvers = {
  Query: {
    // returns account A&A
    bigCommerceLogin: async (_, {email, pass}, {dataSources}) => {
      return dataSources.BigCommerceLogin.getLogin(email, pass);
    }
  }
};

module.exports = resolvers;