import $ from 'jQuery';
import moment from 'moment';

class Hotel {
  constructor() {
    this.guests = [];
    this.rooms = [];
    this.roomTypes = [];
    this.bookings = [];
    this.currentDate = '';
    this.manager = 'manager';
    this.sales = 0;
  }

  loadGuests(data) {
    this.guests = data;
  }

  loadRooms(data) {
    this.rooms = data;
  }

  loadBookings(data) {
    this.bookings = data;
  }

  findCurrentDate() {
    this.currentDate = moment(Date.now()).format('YYYY/MM/DD');
  }

  findRoomTypes() {
    return this.rooms.reduce((acc, room) => {
      if (!acc.includes(room.roomType)) {
        acc.push(room.roomType);
      }
      return acc;
    }, [])
    
  }
  
  changeRoomTypeCase() {
    let typeList = this.findRoomTypes();
    let caseTypeList = [];
    typeList.forEach(type => {
      type = type.replace(/\b[a-z]/g, (type) => {
        return type.toUpperCase();
      });
      caseTypeList.push(type);
    })
    return caseTypeList
  }

  calculateNumberAvailableRooms() {
    let bookedRooms = this.bookings.filter(booking => {
      return booking.date === this.currentDate;
    })
    return this.bookings.length - bookedRooms.length;
  }

  calculatePercentageRoomsBooked() {
    let bookedRooms = this.calculateNumberAvailableRooms();
    return Math.floor((bookedRooms / this.bookings.length) * 100);
  }

  calculateDailyRevenueFromRooms() {
    this.bookings.filter(booking => {
      if(booking.date === this.currentDate) {
        let roomMatch = this.rooms.find(room => {
          return booking.roomNumber === room.number;
        })
        this.sales += roomMatch.costPerNight;
      }
    })
    this.sales = this.sales.toLocaleString("en-US", {style:"currency", currency:"USD"});
  }
}


export default Hotel;