import chai from 'chai';
const expect = chai.expect;

import User from '../src/scripts/User';
import userData from '../src/mock-data/users-data.js';
import bookingData from '../src/mock-data/booking-data.js';

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
    })

    describe('All Reservations', function() {
      it('should start with an empty array', function() {
        expect(user.allReservations).to.deep.equal([]);
      })

      it('should be able to hold reservations from a method', function() {
        user.findReservations(bookingData);
        let userReservations = bookingData.filter(booking => {
          return booking.userID === user.id;
        })
        expect(user.allReservations).to.deep.equal(userReservations);
      })
    })
  })
  describe('Method Tests', function() {
    beforeEach(() => {
      user.findReservations(bookingData);
    })
    
    it('should be able to make a new booking', function() {
      expect(user.allReservations.length).to.deep.equal(25);
      user.makeReservation(bookingData[0]);
      expect(user.allReservations.length).to.deep.equal(26);
    })

    it('should be able to sort the reservations', function() {
      //not sure how to test this...
    })
  })
})
