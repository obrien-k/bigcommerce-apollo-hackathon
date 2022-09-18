/* Don't over-complicate before
const { RESTDataSource } = require('apollo-datasource-rest');
require('dotenv').config({ path: '../.env' });

class BigCommerceCustomersAPI extends RESTDataSource {
  willSendRequest(request) {
    request.headers.set('Content-Type', 'application/json');
    request.headers.set('X-Auth-Token', process.env.BIGC_ACCESS_TOKEN);
  }
  constructor() {
    super();
    // Sets the base URL for the BigCommerce REST API
    this.baseURL = 'https://api.bigcommerce.com/stores/' + process.env.BIGC_STORE_HASH + '/v3/';
  }

  async getProducts(){
    return this.get(`customers/`);
  }

}

module.exports = BigCommerceCustomersAPI
*/