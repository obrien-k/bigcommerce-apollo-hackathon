const { RESTDataSource } = require('apollo-datasource-rest');
require('dotenv').config({ path: '../.env' });

class BigCommerceCatalogAPI extends RESTDataSource {
  willSendRequest(request) {
    request.headers.set('Content-Type', 'application/json');
    request.headers.set('X-Auth-Token', process.env.BIGC_ACCESS_TOKEN);
  }
  constructor() {
    super();
    // Sets the base URL for the BigCommerce REST API
    this.baseURL = 'https://api.bigcommerce.com/stores/' + process.env.BIGC_STORE_HASH + '/v3/';
  }

  async getAllProducts(){
    return this.get(`catalog/products`);
  }

}

module.exports = BigCommerceCatalogAPI