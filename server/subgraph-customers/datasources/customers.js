const { RESTDataSource } = require('apollo-datasource-rest');

class BigCommerceCustomersAPI extends RESTDataSource {
  willSendRequest(request) {
    request.headers.set('Content-Type', 'application/json');
    request.headers.set('X-Auth-Token', process.env.BIGC_ACCESS_TOKEN);
  }

  constructor() {
    super();
    this.baseURL = `https://api.bigcommerce.com/stores/${process.env.BIGC_STORE_HASH}/v3/`;
  }

  /*
   * Placeholder so the subgraph boots and resolves without login/account
   * flows wired up yet. The gateway already forwards `email`/`pass` headers
   * from the client handshake (see server/index.js context) -- read them from
   * `context` in your resolvers once you build out real customer queries.
   */
  async getPlaceholder() {
    return {
      id: 'customers-placeholder',
      message: 'Wire BigCommerceCustomersAPI up to BigCommerce customer endpoints and build your login/account schema here.'
    };
  }
}

module.exports = BigCommerceCustomersAPI
