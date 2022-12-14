const { RESTDataSource } = require('apollo-datasource-rest');
require('dotenv').config({ path: '../.env' });

class BigCommerceStorefrontAPI extends RESTDataSource {
  willSendRequest(request) {
    request.headers.set('Content-Type', 'application/json');
    request.headers.set('X-Auth-Token', process.env.BIGC_ACCESS_TOKEN);
  }
  constructor() {
    super();
    // Sets the base URL for the BigCommerce REST API
    this.baseURL = 'https://api.bigcommerce.com/stores/' + process.env.BIGC_STORE_HASH + '/v3/';
  }

  async getStorefrontToken(allowed_cors_origins, channel_id, expires_at) {
        // Send a POST request to BigCommerce endpoint 
        const reqBody = {"allowed_cors_origins": [
          "https://apollographql.com"
          ],
          "channel_id": 1,
          "expires_at": 1885635176
          }
    return this.post(`storefront/api-token`, reqBody);
  }
  // next: https://developer.bigcommerce.com/api-reference/9d3747546a160-revoke-a-token
}

module.exports = BigCommerceStorefrontAPI