import chai from 'chai';
const expect = chai.expect;

import {User, Customer, Manager} from '../src/scripts/User';

describe('User Class', function() {
  let user;
  let customer;
  let manager;

  beforeEach(() => {
    user = new User();
    customer = new Customer(1, 'Trent Reznor');
    manager = new Manager();
  });
  
  it('should be a function', function() {
    expect(User).to.be.a('function');
  });

  it('should be an instance of the User class', function() {
    expect(user).to.be.an.instanceOf(User);
  });

  describe('Customer Class', function() {

    it('should be a function', function() {
      expect(Customer).to.be.a('function');
    });

    it('should be an instance of the User class', function() {
      expect(customer).to.be.an.instanceOf(Customer);
    });
  })

  describe ('Manager Class', function() {

    it('should be a function', function() {
      expect(Manager).to.be.a('function');
    });

    it('should be an instance of the User class', function() {
      expect(manager).to.be.an.instanceOf(Manager);
    });
  })
});
