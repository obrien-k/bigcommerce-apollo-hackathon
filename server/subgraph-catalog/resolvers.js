const { AuthenticationError } = require("apollo-server"); //unused but needs to be

const resolvers = {
  Query: {
    Products: async (_, __, { dataSources }) => {
      return dataSources.BigCommerceCatalogAPI.getProducts();
    }
  }
};

module.exports = resolvers;