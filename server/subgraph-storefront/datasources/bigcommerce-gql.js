/* Postponed for now */
/* Getting errors back at least, still needs a lot of cleanup and architecture*/
require('dotenv').config({ path: '../.env' });
const { GraphQLDataSource } = require('apollo-datasource-graphql');
const { gql }               = require('apollo-server');

class BigCommerceLogin extends GraphQLDataSource {

  willSendRequest(request) {
    const { accessToken } = this.context;
    //checkBigCommerce(request.headers.email, request.headers.pass);

    if (!request.headers) {
      request.headers = {'Authorization':''}; // fix this
    }
 //   console.log("LINE 63" + request.headers.email);
   // console.log("LINE 64" + request.headers.pass);
  }

  baseURL = 'https://store-ulvz89a2ui.mybigcommerce.com/graphql'

  async getLogin() {
    try {
      console.log('line 68 bigcommerce-gql.js');
      const reqBody = gql`query Test {
        site {
          products {
            pageInfo {
              startCursor
              endCursor
            }
            edges {
              cursor
              node {
                entityId
                name
              }
            }
          }
        }
      }`
     const response = await this.query(reqBody, {
       /* variables: {
          example
        } */
      });
      
      return response.data.site;
    } catch (error) {
      console.error(error);
    }
  }
}

// need customer-impersonate / customer-login components

module.exports = BigCommerceLogin;
