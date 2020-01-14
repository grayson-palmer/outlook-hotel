import chai from 'chai';
const expect = chai.expect;
import moment from 'moment';

import Hotel from '../src/scripts/Hotel.js';
import bookingData from '../src/mock-data/booking-data.js';
import roomData from '../src/mock-data/rooms-data.js';
import userData from '../src/mock-data/users-data.js';

describe('Hotel Class', function() {
  let hotel;

  beforeEach(() => {
    hotel = new Hotel();
  })

  describe('Basic Tests', function() {
    it('should be a function', function() {
      expect(Hotel).to.be.a('function');
    });

    it('should be an instance of the Hotel class', function() {
      expect(hotel).to.be.an.instanceOf(Hotel);
    });
  })

  describe('Property Tests', function() {
    describe('Guest Property', function() {
      it('should have an array for all guests', function() {
        expect(hotel.guests).to.deep.equal([]);
      });

      it('should hold the userData', function() {
        hotel.loadGuests(userData);
        expect(hotel.guests).to.deep.equal(userData);
      })
    })

    describe('Room Property', function() {
      it('should have an array for all rooms', function() {
        expect(hotel.rooms).to.deep.equal([]);
      });

      it('should hold the roomData', function() {
        hotel.loadRooms(roomData);
        expect(hotel.rooms).to.deep.equal(roomData);
      })
    })

    describe('Booking Properties', function() {
      it('should have an array for all bookings', function() {
        expect(hotel.bookings).to.deep.equal([]);
      });

      it('should hold the bookingData', function() {
        hotel.loadBookings(bookingData);
        expect(hotel.bookings).to.deep.equal(bookingData);
      })

    })

    describe('Date Property', function() {
      it('should be able to store the date', function() {
        expect(hotel.currentDate).to.equal('');
      })

      it('should store the current date', function() {
        hotel.findCurrentDate();
        expect(hotel.currentDate).to.equal(moment(Date.now()).format('YYYY/MM/DD'));
      })
    })


  })

  describe('Method Tests', function() {
    beforeEach(() => {
      hotel.findCurrentDate();
      hotel.loadBookings(bookingData);
      hotel.loadRooms(roomData);
      hotel.loadGuests(userData);
    })

    it('should return a list of all room types', function() {
      expect(hotel.findRoomTypes()).to.deep.equal([ 'residential suite', 'suite', 'single room', 'junior suite' ])
    })

    it('should modify the array to proper casing', function() {
      expect(hotel.changeRoomTypeCase()).to.deep.equal([ 'Residential Suite', 'Suite', 'Single Room', 'Junior Suite' ])
    })

    it('should calculate the number of available rooms', function() {
      let availableRooms = hotel.calculateNumberAvailableRooms();
      expect(availableRooms).to.equal(982);
    })

    it('should calculate the percentage of available rooms', function() {
      let percentage = hotel.calculatePercentageRoomsBooked();
      expect(percentage).to.equal(98);
    })

    it('should calculate the revenue for todays bookings', function() {
      let revenue = hotel.calculateDailyRevenueFromRooms();
      expect(hotel.sales).to.equal('$6,408.65');
    })
  })
});