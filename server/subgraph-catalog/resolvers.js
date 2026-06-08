const resolvers = {
  Query: {
    CatalogPlaceholder: async (_, __, { dataSources }) => {
      return dataSources.BigCommerceCatalogAPI.getPlaceholder();
    }
  }
};

module.exports = resolvers;
