import chai from 'chai';
const expect = chai.expect;

import Room from '../src/scripts/Room.js';

describe('Room Class', function() {
  let room;

  beforeEach(() => {
    room = new Room({
      number: 1,
      roomType: "residential suite",
      bidet: true,
      bedSize: "queen",
      numBeds: 1,
      costPerNight: 358.4
      });
  });

  describe('Basic Tests', function() {
    it('should be a function', function() {
      expect(Room).to.be.a('function');
    });
  
    it('should be an instance of the Room class', function() {
      expect(room).to.be.an.instanceOf(Room);
    });
  })

  describe('Property Tests', function() {
    it('should have a room number', function() {
      expect(room.roomNumber).to.equal(1);
    });

    it('should have a room type', function() {
      expect(room.roomType).to.equal('residential suite');
    });
    
    it('should have a flag for if there is a bidet', function() {
      expect(room.bidet).to.equal(true);
    });
    
    it('should have a bed size', function() {
      expect(room.bedSize).to.equal('queen');
    });

    it('should have how many beds are in the room', function() {
      expect(room.numBeds).to.equal(1);
    });

    it('should have a cost for a nights stay', function() {
      expect(room.costPerNight).to.equal(358.4);
    });
  })

  describe('Method Tests', function() {

  })
});
