import chai from 'chai';
const expect = chai.expect;

import User from '../src/scripts/User';
import userData from '../src/mock-data/users-data.js';

describe('User Class', function() {
  let user;

  beforeEach(() => {
    user = new User(userData[0]);
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
    it('should have an id', function() {
      expect(user.id).to.equal(1);
    });

    it('should have a name', function() {
      expect(user.name).to.equal('Leatha Ullrich');
    })

    describe('Amount Spent', function() {
      it('should start with 0 amount spent', function() {
        expect(user.amountSpent).to.equal(0);
      });

      it('should update the amount spent with a total of all previous bookings', function() {
        user.calculateAmountSpent();
      })
    })
  })
});
