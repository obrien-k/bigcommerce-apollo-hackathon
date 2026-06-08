const resolvers = {
  Query: {
    CatalogPlaceholder: async (_, __, { dataSources }) => {
      return { data: await dataSources.BigCommerceCatalogAPI.getPlaceholder() };
    }
  }
};

module.exports = resolvers;
