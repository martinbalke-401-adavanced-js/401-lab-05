'use strict';

class Model {
  constructor(schema) {
    this.schema = schema;
  }
  // CRUD: create
  create(item) {
    // returns a Promise!
    let validatedItem = new this.schema(item);
    return validatedItem.save();
  }

  // CRUD: read / search - we don't know if it exists
  get(_id) {
    // return a Promise!
    if (_id) return this.schema.findOne({ _id });
    else return this.schema.findOne({});
  }

  getByQuery(query) {
    // query is an object!
    // ex: {firstName: 'Sarah'}
    if (query) return this.schema.find(query);
    else return this.schema.find({});
  }

  // CRUD: update - you usually only update something that exists
  // if something exists, it has an id
  update(id, item) {
    // change a piece of the data
    // change data where data.id === id
    // [async] write data to file
    // make sure your change is in this.database
    // write this.database to file
    // look up findByIdAndUpdate
  }

  // CRUD: delete
  delete(id) {
    // find this.database object where object.id === id (forEach??)
    // remove that object (map??)
    // [async] write the new (smaller) this.database to the file
    // look up findByIdAndDelete
  }
}

module.exports = Model;
