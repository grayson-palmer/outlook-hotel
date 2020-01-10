//User Parent Class
class User {
  constructor(obj) {
    this.userName = obj.id > 0 ? `customer${obj.id}` : 'manager';
    this.password = 'overlook2019';
  }

  loginUser() {

  }
}


//Customer Class Extend
class Customer extends User {
  constructor(obj) {
    super(obj);
    this.id = obj.id;
    this.name = obj.name;
  }
}

//Manager Class Extend
class Manager extends User {
  constructor(obj) {
    super(obj);
  }
}

module.exports = {
  User: User,
  Customer: Customer,
  Manager: Manager
};