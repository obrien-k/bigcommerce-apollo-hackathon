const { GraphQLDataSource } = require('apollo-datasource-graphql');
const { gql } = require('apollo-server');

const login = gql` 
 mutation Login($email: String!, $pass: String!) {
   login(email: $email, password: $pass) {
     result
   }
 }
 `;

class BigCommerceLogin extends GraphQLDataSource {
  baseURL = 'https://hack.bigcom.dev/graphql';

  willSendRequest(request) {
    const { accessToken } = this.context;

    if (!request.headers) {
      request.headers = {};
    }
    
    request.headers.authorization = accessToken;
  }

  async getLogin() {
    try {
      const response = await this.query(login, {
        variables: {
          email,
          pass
        }
      });

      return response.data.login;
    } catch (error) {
      console.error(error);
    }
  }
}

module.exports = BigCommerceLogin;