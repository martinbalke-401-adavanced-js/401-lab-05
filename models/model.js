'use strict';

class Model {
  constructor(schema) {
    this.schema = schema;
  }

  create(item) {
    let validatedItem = new this.schema(item);
    return validatedItem.save();
  }

  get(_id) {
    if (_id) return this.schema.findOne({ _id });
    else return this.schema.findOne({});
  }

  getByQuery(query) {
    return this.schema.find(query);
  }

 
  update(id, item) {
    let updated = this.schema.findByIdAndUpdate(id, item);
    return updated ? updated : {};
  }


  delete(id) {
    return this.schema.findByIdAndDelete(id);
  }
}

module.exports = Model;
