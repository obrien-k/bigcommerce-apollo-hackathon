
class AuthSource {
  getAuth() {
    return auth;
  }
  /*
  getAdminById(authId) {
    const authFile = fs.readFileSync(__dirname + '/auth.json', {encoding:'utf-8'})
    const parsedFile = JSON.parse(adminFile);
    const findAuth = (parsedFile.auth.find(i => i.id == authId))
    return findAuth;
  }*/
}

module.exports = AuthSource;

// use this https://developer.bigcommerce.com/api-reference/b3A6MjMxMzY0Ng-get-current-customer