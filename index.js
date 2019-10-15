'use strict';

const mongoose = require('mongoose');
const db = 'mongodb://127.0.0.1:27017/app';

const configs = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
};

mongoose.connect(db, configs);


const Teams = require('./models/teams.js');
const People = require('./models/people.js');

const people = new People();
const teams = new Teams();

const classMates = [];
const teamsArray = [];
const query = process.argv[2];


async function makePerson(firstName, lastName, birthday, likes) {
  let person = {firstName, lastName, birthday, likes};
  let made = await people.create(person);
  return made;

}
async function makeTeam(name, color) {
  let team = {name, color};
  let made = await teams.create(team);
  return made;

}

async function findPerson(person){
  let found = await people.getByQuery(person);
  return found;
}

async function updatePerson(id, updatedInformation){
  let updated = await people.update(id, updatedInformation);
  return updated;
}

async function randomizeTeams() {

  let numbers = [0, 1, 2];
  let teamNumber = numbers[Math.floor(Math.random() * 3)];
  for (let i = 0; i < classMates.length; i++) {
    if (i === 2) {
      let random = numbers.findIndex((number) => number === teamNumber);
      numbers.splice(random, 1);
      teamNumber = numbers[Math.floor(Math.random() * 2)];
    }
    if (i === 4) {
      let random = numbers.findIndex((number) => number === teamNumber);
      numbers.splice(random, 1);
      teamNumber = numbers[0];
    }
    await updatePerson(classMates[i]._id, { _team: teamsArray[teamNumber]._id });
    
  }

}
async function commandLineQuery(query){
  if(!query) console.log(`
  Teams: ${teamsArray.length} 
  People: ${classMates.length}`);
  // let person = findPerson(query);
  // console.log(`
  // Name: ${person.firstName} ${person.lastName}
  // Team: ${person._team}
  // Birthday: ${person.birthday}
  // Likes: ${person.likes}
  // `);
}

async function initialize(){

  try {
    let martin = await makePerson('Martin', 'Balke', '06-12-1991', 'dogs');
    let james = await makePerson('James', 'Dunn', '06-12-1991', 'dogs');
    let jessica = await makePerson('Jessica', 'Elliot', '06-12-1991', 'dogs');
    let morgan = await makePerson('Morgan', 'Shaw', '06-12-1991', 'dogs');
    let nadya = await makePerson('Nadya', 'Illinskaya', '06-12-1991', 'dogs');
    let anna = await makePerson('Anna', 'Something', '06-12-1991', 'dogs');
    let meron = await makePerson('Meron', 'Sibani', '06-12-1991', 'dogs');
    classMates.push(martin, james, jessica, morgan, nadya, anna, meron);

    let redHeron = await makeTeam('Red Heron', 'red');
    let blueOtter = await makeTeam('Blue Otter', 'blue');
    let yellowRhino = await makeTeam('Yellow Rhino', 'yellow');
    teamsArray.push(redHeron, blueOtter, yellowRhino);

    await randomizeTeams();
    await commandLineQuery(query);

  } catch (error) {
    console.error(error);
  }

  
}


initialize()
  .then( () => mongoose.connection.close())
  .catch( (error) => console.error(error));