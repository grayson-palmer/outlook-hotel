//User Parent Class
class User {
  constructor(obj) {
    this.id = obj.id
    this.name = obj.name
    this.amountSpent = 0;
    this.allReservations = [];
  }

  makeReservation(booking) {
    this.allReservations.push(booking);
    this.pushReservation(booking);
  }

  pushReservation(booking) {
    fetch('https://fe-apps.herokuapp.com/api/v1/overlook/1904/bookings/bookings', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        'userID': booking.userID,
        'date': booking.date,
        'roomNumber': parseInt(booking.roomNumber)
      })
    }).then(() => {
      console.log(`${booking.roomNumber} is booked`);
    }).catch(() => {
      console.log('Failed to book room');
    })
  }

  findReservations(bookings) {
    let userReservations = bookings.filter(booking => {
      return booking.userID === this.id;
    })
    userReservations.forEach(res => this.allReservations.push(res));
  }
  
  sortReservations() {
    this.allReservations.map(booking => {
      booking["numDate"] = Number(booking.date.split('/').join(''))
      return booking
    });
    this.allReservations.sort((a, b) => b.numDate - a.numDate);
  }
}

export default User;