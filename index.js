'use strict';

const mongoose = require('mongoose');
//Path to the database
const db = 'mongodb://127.0.0.1:27017/app';

//Configs for Mongoose
const configs = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
};

mongoose.connect(db, configs);

//Loading in and creating the teams and people models
const Teams = require('./models/teams.js');
const People = require('./models/people.js');
const people = new People();
const teams = new Teams();

//Global Variables
const classMates = [];
const teamsArray = [];
//The command line query
const query = `${process.argv[2]} ${process.argv[3]}`;

/**
 * Make person takes in a set of strings and converts them in to and object to run create
 * @param {string} firstName 
 * @param {string} lastName 
 * @param {string} birthday 
 * @param {string} likes 
 * @returns {object}
 */
async function makePerson(firstName, lastName, birthday, likes) {
  let person = {firstName, lastName, birthday, likes};
  let made = await people.create(person);
  return made;
}

/**
 * Make team takes in a set of strings, converts them to an object, and uses that object to create a team
 * @param {string} name 
 * @param {string} color 
 * @returns {object}
 */
async function makeTeam(name, color) {
  let team = {name, color};
  let made = await teams.create(team);
  return made;

}
/**
 * Find person based on a query in the form of an object
 * @param {object} person 
 */
async function findPerson(person){
  let found = await people.getByQuery(person);
  return found;
}

/**
 * Find team based on a query in the form of an object
 * @param {object} team
 */
async function findTeam(team) {
  let found = await teams.getByQuery(team);
  return found;
}
/**
 * Update a person after finding them in the database with the new updated information
 * @param {string} id 
 * @param {object} updatedInformation 
 */
async function updatePerson(id, updatedInformation){
  let updated = await people.update(id, updatedInformation);
  return updated;
}

/**
 * Randomize teams takes the people generated in Initialize() and randomly assigns them
 * to teams in a 2,2,3 configuration
 */
async function randomizeTeams() {
  //Array of possible indexes
  let numbers = [0, 1, 2];
  let teamNumber = numbers[Math.floor(Math.random() * 3)];
  for (let i = 0; i < classMates.length; i++) {
    if (i === 2) {
      //Remove the number at it's index from the numbers array
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

/**
 * Given a command line query console logs different results
 * @param {string} query 
 */

async function commandLineQuery(query){
  //If query is not present console log the teams and people
  if(!query) return console.log(`
  Teams: ${teamsArray.length} 
  People: ${classMates.length}`);
  
  //If the query matches a person's name console log that person
  let person = await findPerson({firstName: query.split(' ')[0]});
  person = person[0];
  if(person){
    return console.log(`
  Name: ${person.firstName} ${person.lastName}
  Team: ${person._team}
  Birthday: ${person.birthday}
  Likes: ${person.likes}
  `);
  }

  //If the query matches a teams name console log that team
  let team = await findTeam({name: query});
  team = team[0];
  if(team){
    return console.log(`
    Team Name: ${team.name}
    Color: ${team.color}
    `);
  }

  //Else console log no record found
  return console.log('No record found');
}

/**
 * Initilize the database and insert the people
 */
async function initialize(){
  
  //Drop the database at the start so you don't get a bunch of duplicate data
  await mongoose.connection.dropDatabase();
  
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