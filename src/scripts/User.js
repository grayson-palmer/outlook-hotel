//User Parent Class
class User {
  constructor() {
    this.username = 'customer';
    this.password = 'overlook2019';
  }

  loginUser() {

  }
}


//Customer Class Extend
class Customer extends User {
  constructor(obj) {
    super();
    this.id = obj.id;
    this.name = obj.name;
  }
}

//Manager Class Extend
class Manager extends User {
  constructor() {
    super();
  }
}

module.exports = {
  User: User,
  Customer: Customer,
  Manager: Manager
};