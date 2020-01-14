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
  }

  findReservations(bookings) {
    let userReservations = bookings.filter(booking => {
      return booking.userId === this.id;
    })
    this.allReservations.push(userReservations);
    // Not functionally sorting date currently
    // this.allReservations.sort((a, b) => {
    //   a = new Date(a.date);
    //   b = new Date(b.date); 
    //   return b.date - a.date;
    // });
  }

  calculateAmountSpent() {

  }
}



export default User;