let { accounts } = require(__dirname + '/admin.json');
const fs = require('fs');

class AdminSource {
  getAdmin() {
    return admin;
  }
  getAdmin(adminId) {
    const adminFile = fs.readFileSync(__dirname + '/admin.json', {encoding:'utf-8'})
    const parsedFile = JSON.parse(adminFile);
    const findAdmin = (parsedFile.admin.find(i => i.id == adminId))
    return findAdmin;
  }
}

module.exports = AdminSource;