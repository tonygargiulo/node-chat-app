[{
  id: 'an849h48',
  name: 'Tony',
  room: 'Office Fam'
}]

// addUser(id, name, room)
// removeUser(id)
// getUser(id)
// getUserList(room)


class Users {
  constructor () {
    this.users = [];
  }
  addUser (id, name, room) {
    var user = {id, name, room};
    this.users.push(user);
    return user;
  }
  removeUser (id) {
    // store user to be removed
    var user = this.users.find((user) => user.id === id);

    // if no user has id given
    if (user === undefined) {
      return undefined;
    }

    var index = this.users.indexOf(user);
    this.users.splice(index, 1); // remove the user
    return user;
  }
  getUser (id) {
    return this.users.find((user) => user.id === id);
  }
  getUserList (room) {
    var users = this.users.filter((user) => user.room === room);
    var namesArray = users.map((user) => user.name);

    return namesArray;
  }
}

module.exports = {Users};


// class Person {
//   constructor (name, age) {
//     this.name = name;
//     this.age = age;
//   }
//   getUserDescription () {
//     return `${this.name} is ${this.age} year(s) old.`;
//   }
// }
//
// var me = new Person('Andrew', 25);
// var description = me.getUserDescription();
// console.log(description);
