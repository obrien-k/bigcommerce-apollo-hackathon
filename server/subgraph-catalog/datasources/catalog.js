const { RESTDataSource } = require('apollo-datasource-rest');

class BigCommerceCatalogAPI extends RESTDataSource {
  willSendRequest(request) {
    request.headers.set('Content-Type', 'application/json');
    request.headers.set('X-Auth-Token', process.env.BIGC_ACCESS_TOKEN);
  }

  constructor() {
    super();
    this.baseURL = `https://api.bigcommerce.com/stores/${process.env.BIGC_STORE_HASH}/v3/`;
  }

  /*
   * Placeholder so the subgraph boots and resolves without a real catalog
   * model wired up yet. Point this at BigCommerce Catalog endpoints (e.g.
   * `catalog/products`) once catalog.graphql reflects your own product schema.
   */
  async getPlaceholder() {
    return {
      id: 'catalog-placeholder',
      message: 'Wire BigCommerceCatalogAPI up to the BigCommerce Catalog API and shape catalog.graphql to your own product model.'
    };
  }
}

module.exports = BigCommerceCatalogAPI
