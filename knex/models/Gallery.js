const bookshelf = require('./bookshelf');



class Gallery extends bookshelf.Model {
  get tableName() {return 'gallery'}
}











module.exports = Gallery;
