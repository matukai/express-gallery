const bookshelf = require('./bookshelf');
const gallery = require('./Gallery');

class User extends bookshelf.Model {
  get tableName() {return 'users'}
  get hasTimestamps() {return true}

  gallery() {
    return this.belongsTo(User)
  }
}



module.exports = User;