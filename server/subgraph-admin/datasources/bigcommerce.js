/* #Log in a customer using email and password
 #
 # If this is being used in a browser, a cookie will be set
 # to authenticate future requests
 #
 # Otherwise, the success message can be used to determine
 # that the credentials are valid
 #
 # Chrome incognito and Safari by default block cross-origin
 # requests containing third-party cookies; this causes
 # subsequent customer queries from the playground to fail.
 #
 # Credentials should ALWAYS be passed as GraphQL Variables
 # Stores in pre-launch or maintenance mode may reject queries.
 # Access from Control Panel > Advanced Settings > Storefront API Playground
 */const login = gql ` 
 mutation Login($email: String!, $pass: String!) {
   login(email: $email, password: $pass) {
     result
   }
 }
 `