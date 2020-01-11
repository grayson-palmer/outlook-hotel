import chai from 'chai';
const expect = chai.expect;

import {User, Customer, Manager} from '../src/scripts/User';

describe('User Class', function() {
  let user;
  let customer;
  let manager;

  beforeEach(() => {
    user = new User({
      id: 1,
      name: "Leatha Ullrich"
    });
    customer = new Customer({
      id: 1,
      name: "Leatha Ullrich"
    });
    manager = new Manager({
      id: 0
    });
  });
  
  describe('Basic User Class Tests', function() {
    it('should be a function', function() {
      expect(User).to.be.a('function');
    });
  
    it('should be an instance of the User class', function() {
      expect(user).to.be.an.instanceOf(User);
    });
  })

  describe('User Property Tests', function() {
    it('should have a username', function() {
      expect(user.userName).to.equal('customer1');
    });

    it('should have a password', function() {
      expect(user.password).to.equal('overlook2019');
    })
  })

  describe('Customer Class', function() {
    describe('Customer Basic Tests', function() {
      it('should be a function', function() {
        expect(Customer).to.be.a('function');
      });
  
      it('should be an instance of the Customer class', function() {
        expect(customer).to.be.an.instanceOf(Customer);
      });

      it('should be an instance of the User class', function() {
        expect(customer).to.be.an.instanceOf(User);
      });
    })

    describe('Customer Property Tests', function() {
      it('should have an id', function() {
        expect(customer.id).to.equal(1);
      })

      it('should store the customers name', function() {
        expect(customer.name).to.equal('Leatha Ullrich')
      })
    })

    describe('Customer Method Tests', function() {
    })
  })

  describe ('Manager Class', function() {
    describe('Manager Basic Tests', function() {
      it('should be a function', function() {
        expect(Manager).to.be.a('function');
      });
  
      it('should be an instance of the Manager class', function() {
        expect(manager).to.be.an.instanceOf(Manager);
      });

      it('should be an instance of the User class', function() {
        expect(manager).to.be.an.instanceOf(User);
      })
    })

    describe('Manager Property Tests', function() {
    })

    describe('Manager Method Tests', function() {
    })
  })
});
