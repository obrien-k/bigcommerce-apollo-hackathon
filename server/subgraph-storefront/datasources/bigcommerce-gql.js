/* Postponed for now */
/* Getting errors back at least, still needs a lot of cleanup and architecture*/
const { GraphQLDataSource } = require('apollo-datasource-graphql');
const { gql }               = require('apollo-server');
const jwt                   = require('jsonwebtoken');

// jwt payload

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
  baseURL = process.env.STORE_CANONICAL_URL;

  willSendRequest(request) {
    const { accessToken } = this.context;
    //checkBigCommerce(request.headers.email, request.headers.pass);

    if (!request.headers) {
      request.headers = {'Authorization':''}; // fix this
    }
 //   console.log("LINE 63" + request.headers.email);
   // console.log("LINE 64" + request.headers.pass);
  }

  async getLogin() {
    try {
      console.log('line 68 bigcommerce-gql.js');
     /* const response = await this.query(login, {
        variables: {
          email,
          pass
        }
      }); */
      const reqBody = gql`{
        # Get a few products from the catalog
 # Stores in pre-launch or maintenance mode may reject queries.
 # Access from Control Panel > Advanced Settings > Storefront API Playground
 # or browse privately and query against https://buybutton.store/graphql
 query paginateProducts(
   $pageSize: Int = 3
   $cursor: String
   # Use GraphQL variables to change the page size, or inject the endCursor as "cursor"
   # to go to the next page!
 ) {
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
 }
      }`
      return this.post(`graphql`, reqBody)
      // return response.data.login;
    } catch (error) {
      console.error(error);
    }
  }
}

// need customer-impersonate / customer-login components

module.exports = BigCommerceLogin;
