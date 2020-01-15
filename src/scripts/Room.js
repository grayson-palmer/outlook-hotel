class Room {
  constructor(obj) {
    this.roomNumber = obj.number;
    this.roomType = obj.roomType;
    this.bidet = obj.bidet;
    this.bedSize = obj.bedSize;
    this.numBeds = obj.numBeds;
    this.costPerNight = obj.costPerNight;
  }
}

export default Room;