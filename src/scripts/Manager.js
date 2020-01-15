import User from '../scripts/User.js';

class Manager extends User {
  constructor() {
    super({id: 0, name: 'manager'}),
    this.selectedUser
  }

  deleteBooking(bookingID) {
    fetch('https://fe-apps.herokuapp.com/api/v1/overlook/1904/bookings/bookings', {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        'id': bookingID
      })
    }).then(() => {
      console.log(`${bookingID} is deleted`);
    }).catch(() => {
      console.log('Failed to delete booking');
    })
  }
}

export default Manager;