const { AuthenticationError } = require("apollo-server"); //unused but needs to be

const resolvers = {
  Query: {
    GetAllProducts: async (_, __, { dataSources }) => {
      return dataSources.BigCommerceCatalogAPI.getAllProducts();
    }
  }
};

module.exports = resolvers;