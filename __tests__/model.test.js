const Model = require('../models/model.js');
const Teams = require('../models/teams.js');
const People = require('../models/people.js');
const supertester = require('./supertester.js');

let people = new People();
let teams = new Teams();

describe('Model CRUD operations', () => {
  test('can create', async (done) => {
    let person = await people.create({ firstName: 'Test', lastName: 'Test' , birthday: '05-13-91', likes: 'things'});
    expect(person).toBeDefined();
    let team = await teams.create({name: 'Zippy Zappos', color: 'yellow'});
    expect(team).toBeDefined();
    done();
  });

  it('can read', async (done) => {
    let person = await people.getByQuery({firstName: 'Test'});
    expect(person[0].firstName).toMatch(/Test/);
    done();
  });

  it('can update', async (done) => {
    let person = await people.getByQuery({ firstName: 'Test' });
    await people.update(person[0]._id, {likes: 'dogs'});
    let updated = await people.get(person[0]._id);
    expect(updated.likes).toMatch(/dogs/);
    done();
  });

  it('can delete', async (done) => {
    let person = await people.getByQuery({ firstName: 'Test' });
    let deleted = await people.delete(person[0]._id);
    expect(deleted.firstName).toMatch(/Test/);
    done();
  });
});

console.log(Model,supertester);
