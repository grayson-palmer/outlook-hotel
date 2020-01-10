class Booking {
  constructor(obj) {
    this.id = obj.id;
    this.userId = obj.userID;
    this.date = obj.date;
    this.roomNumber = obj.roomNumber;
    this.roomServiceCharges = obj.roomServiceCharges;
  }
}



export default Booking;