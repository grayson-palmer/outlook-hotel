import chai from 'chai';
const expect = chai.expect;

import Booking from '../src/scripts/Booking.js';

describe('Booking Class', function() {
  let booking;

  beforeEach(() => {
    booking = new Booking({
      id: "5fwrgu4i7k55hl6sz",
      userID: 9,
      date: "2020/02/04",
      roomNumber: 15,
      roomServiceCharges: [ ]
    })
  })

  describe('Basic Tests', function() {
    it('should be a function', function() {
      expect(Booking).to.be.a('function');
    });

    it('should be an instance of the Booking class', function() {
      expect(booking).to.be.an.instanceOf(Booking);
    });
  })

  describe('Property Tests', function() {
    it('should have an ID', function() {
      expect(booking.id).to.equal("5fwrgu4i7k55hl6sz");
    });

    it('should have the ID of the customer who made the booking', function() {
      expect(booking.userID).to.equal(9);
    });

    it('should have the date the booking is made for', function() {
      expect(booking.date).to.equal("2020/02/04");
    });

    it('should have the room number for the booking', function() {
      expect(booking.roomNumber).to.equal(15);
    });

    it('should have a list of the room service charges made', function() {
      expect(booking.roomServiceCharges).to.deep.equal([]);
    });
  })

  describe('Method Tests', function() {
    // it('', function() {
    //   expect(booking.).to.equal();
    // })
  })
});
