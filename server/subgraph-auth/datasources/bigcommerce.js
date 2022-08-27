const { GraphQLDataSource } = require('apollo-datasource-graphql');
const { gql }               = require('apollo-server');
const jwt                   = require('jsonwebtoken');

// jwt payload
const payload = async function(req, res, next) {
  // Get token from header
  const token = req.header('x-auth-token');

  // Check if no token
  if (!token) {
    return res.status(401).json({ msg: 'No token, authorization denied' });
  }

  // Verify token
  try {
    const decoded = jwt.verify(token, config.get('jwtSecret'));

    req.user = decoded.user;
    next();
  } catch (err) {
    res.status(401).json({ message: 'Token is not valid' });
  }
};

async function checkBigCommerce(email, pass) { // where to call this? is this being executed correctly 
const saltRounds = 10; // ? feels off, like I know what I'm doing incorrectly

const someOtherPlaintextPassword = 'not_bacon';

const hash = bcrypt.hashSync(payload, saltRounds);
// Store hash in your password DB.
/* This is jwt*/
// const jwt = Bearer ey
// e.g. 
// Load hash from your password DB.
bcrypt.compareSync(payload, hash); // true
bcrypt.compareSync(someOtherPlaintextPassword, hash); // false
}
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