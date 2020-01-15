import chai from 'chai';
import spies from 'chai-spies';

chai.use(spies);

const expect = chai.expect;

import Manager from '../src/scripts/Manager';
import User from '../src/scripts/User';

describe('Manager Class', function() {
  let manager;

  beforeEach(() => {
    manager = new Manager();
  })

  describe('Basic Tests', function() {
    
    it('should be a function', function() {
      expect(Manager).to.be.a('function');
    })

    it('should be an instance of Manager', function() {
      expect(manager).to.be.an.instanceOf(Manager);
    })

    it('should be an extension of the User class', function() {
      expect(manager).to.be.an.instanceOf(User);
    })
  })

  describe('Property Tests', function() {
    it('should be able to store a selected guest', function() {
      expect(manager.selectedUser).to.equal(undefined);
    })
  })

  describe('Method Tests', function() {
    it('should be able to delete a booking', function() {
      let spy = chai.spy.on(manager, 'deleteBooking', returns => 'has run');
      manager.deleteBooking(1);
      expect(spy).to.have.been.called();
    })
  })
})