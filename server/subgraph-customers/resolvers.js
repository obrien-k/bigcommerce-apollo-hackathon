const resolvers = {
  Query: {
    CustomersPlaceholder: async (_, __, { dataSources }) => {
      return dataSources.BigCommerceCustomersAPI.getPlaceholder();
    }
  }
};

module.exports = resolvers;
