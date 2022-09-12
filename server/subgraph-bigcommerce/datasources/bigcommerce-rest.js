require('dotenv').config()
const { RESTDataSource } = require('apollo-datasource-rest');

class BigCommerceRestAPI extends RESTDataSource {
  willSendRequest(request) {
    request.headers.set('X-Auth-Token', BIGC_ACCESS_TOKEN);
  }
  constructor() {
    super();
    // Sets the base URL for the BigCommerce REST API
    this.baseURL = 'https://api.bigcommerce.com/stores/' + BIGC_STORE_HASH + '/v3/';
  }

  async postToken(allowed_cors_origins, channel_id, expires_at) {
    // Send a POST request to 
    
    return this.post(`storefront/api-token`);
  }
}

module.exports = BigCommerceRestAPI