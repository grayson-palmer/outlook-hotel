import chai from 'chai';
const expect = chai.expect;

import Hotel from '../src/scripts/Hotel.js';

describe('Hotel Class', function() {
  let hotel;

  beforeEach(() => {
    hotel = new Hotel({
      
    })
  })

  describe('Basic Tests', function() {
    it('should be a function', function() {
      expect(Hotel).to.be.a('function');
    });

    it('should be an instance of the Hotel class', function() {
      expect(hotel).to.be.an.instanceOf(Hotel);
    });
  })
});