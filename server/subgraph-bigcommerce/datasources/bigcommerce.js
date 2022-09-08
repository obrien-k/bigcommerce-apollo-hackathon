const { GraphQLDataSource } = require('apollo-datasource-graphql');
const { gql }               = require('apollo-server');
const jwt                   = require('jsonwebtoken');
const express               = require('express');
      router                = express.Router();
const BigCommerce           = require('node-bigcommerce');
 
const bigCommerce = new BigCommerce({
  logLevel: 'info',
  clientId: process.env.BIGC_CLIENT_ID,
  secret: process.env.BIGC_CLIENT_SECRET,
  callback: 'https://store-' + process.env.BIGC_STORE_HASH + '.bigcommerce.com/auth',
  responseType: 'json',
  headers: { 'Accept-Encoding': '*' }, // Override headers (Overriding the default encoding of GZipped is useful in development)
  apiVersion: 'v3' // Default is v2
});

// jwt payload

router.get('/auth', (req, res, next) => {
  bigCommerce.authorize(req.query)
    .then(data => res.render('integrations/auth', { title: 'Authorized!', data: data })
    .catch(next));
  });

async function checkBigCommerce(email, pass) { // where to call this? is this being executed correctly 
  const payload = async function(req, res, next) {
    // Get token from header
    const token = req.header('authorization');
    const stencil_token = process.env.BIGC_STENCIL_TOKEN
    console.log(stencil_token + "LINE 10" + "GEN AUTH HEADER" + token);
    
    // Check if no token
    if (!stencil_token) {
      return res.status(401).json({ msg: 'No token, authorization denied' });
    }
  
    // Verify token
    try {
      const decoded = jwt.verify(token, config.get('jwtSecret'));
  
      stencil_token = decoded.stencil_token;
      next();
    } catch (err) {
      res.status(401).json({ message: 'JWT is not valid' });
    }
  };
  
  const saltRounds = 10; // ? feels off, like I know what I'm doing incorrectly
  console.log(payload + "LINE 29");
  console.log(email + "LINE 31");
  const hash = bcrypt.hashSync(pass, saltRounds);

  /* This is jwt*/
  // const jwt = Bearer ey
  // e.g. 
  // Load hash from your password DB.
  bcrypt.compareSync(pass, hash); // true
  bcrypt.compareSync(email, hash); // false
  }

const login = gql` 
 mutation Login($email: String!, $pass: String!) {
   login(email: $email, password: $pass) {
     result
   }
 }
 `;

class BigCommerceLogin extends GraphQLDataSource {
  baseURL = 'https://store-';
// use this https://developer.bigcommerce.com/api-reference/b3A6MjMxMzY0Ng-get-current-customer
  willSendRequest(request) {
    const { accessToken } = this.context;

    checkBigCommerce(request.headers.email, request.headers.pass);

    if (!request.headers) {
      request.headers = {};
    }
    console.log("LINE 63" + request.headers.email);
    console.log("LINE 64" + request.headers.pass);
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

// need customer-impersonate / customer-login components

module.exports = BigCommerceLogin;