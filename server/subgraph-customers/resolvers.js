const resolvers = {
  Query: {
    CustomersPlaceholder: async (_, __, { dataSources }) => {
      return { data: await dataSources.BigCommerceCustomersAPI.getPlaceholder() };
    }
  }
};

module.exports = resolvers;
