const expect = require('expect');

const {Users} = require('./users');

describe('Users', () => {

  var users;
  beforeEach(() => {
    users = new Users();
    users.users = [{
      id: '1',
      name: 'Tony',
      room: 'Node Course Room',
      lowerCaseRoom: 'node course room'
    },  {
      id: '2',
      name: 'Wilma',
      room: 'React Course Room',
      lowerCaseRoom: 'react course room'
    },  {
      id: '3',
      name: 'Bob',
      room: 'Node Course Room',
      lowerCaseRoom: 'node course room'
    }];
  });

  it('should add new user', () => {
    var users = new Users();
    var user = {
      id: '123',
      name: 'Tony',
      room: 'Office Fam',
      lowerCaseRoom: 'office fam'
    };
    var resUser = users.addUser(user.id, user.name, user.room);

    expect(users.users).toEqual([user]);
  });

  it('should remove a user', () => {
    var expectedRemovedUser = users.users[0]; // store user to remove
    var removedUser = users.removeUser('1'); // return removed user

    expect(removedUser).toEqual(expectedRemovedUser);
    expect(users.users[0].id).toEqual('2');
  });

  it('should not remove user', () => {
    var removedUser = users.removeUser('100'); // no user has this id

    expect(removedUser).toEqual(undefined);
    expect(users.users.length).toBe(3);
  });

  it('should find user', () => {
    var user = users.getUser('2');

    expect(user).toBe(users.users[1]);
  });

  it('should not find user', () => {
    var user = users.getUser('100'); // no user has this id

    expect(user).toBe(undefined);
  });

  it('should return names for node course room', () => {
    var userList = users.getUserList('node course room');

    expect(userList).toEqual(['Tony', 'Bob']);
  });
  it('should return names for react course room', () => {
    var userList = users.getUserList('react course room');

    expect(userList).toEqual(['Wilma']);
  });

});
