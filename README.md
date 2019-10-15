# LAB - 05

## Lab 05 MongoDB

### Author: Martin

### Links and Resources
* [submission PR](https://github.com/martinbalke-401-adavanced-js/401-lab-05/pull/1)
* [travis](https://www.travis-ci.com/martinbalke-401-adavanced-js/401-lab-05)


### Modules
#### `Model.js`
##### Model.create , Model.get, Model.getByQuery, Model.update, Model.delete

###### `create({object}) -> object`
Creates an collection inside of mongodb as long as schema types are all present

###### `get(ID) -> object`
Get an item out of the database searching by the _id property



### Setup
#### `.env` requirements
* `MONGODB_URI` - 'mongodb://127.0.0.1:27017/app'

#### Running the app
* `npm start` -> optional command line argument
  
#### Tests
* How do you run tests?
`npm test`
* What assertions were made?
`Model has fully functioning CRUD operations`

#### UML
Still needed