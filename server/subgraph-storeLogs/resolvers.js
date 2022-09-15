const { AuthenticationError } = require("apollo-server"); //unused but needs to be

const resolvers = {
  Query: {
    // trying store logs (GET instead of POST like above)
    SystemLogs: async (_, __, { dataSources }) => {
      return dataSources.BigCommerceStoreLogsAPI.getSystemLogs();
    }
  }
};

module.exports = resolvers;