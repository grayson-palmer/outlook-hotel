import $ from 'jquery';

const domUpdates = {
  
  showDashboard(userType, currentUser, hotel) {
    if (userType === 'customer') {
      $('.login-container').fadeOut(500);
      $('.dashboard')
        .delay(500)
        .css("display", "grid")
        .hide()
        .fadeIn(500);
      this.customerDashboardHeader(currentUser);
      this.customerDashboardPastBookings(currentUser, hotel.currentDate);
      this.customerDashboardCurrentBookings(currentUser, hotel.currentDate);
      this.customerDashboardAvailableRooms(hotel);
    } else {
      $('.login-container').fadeOut(500);
      $('.dashboard')
        .delay(500)
        .css("display", "grid")
        .hide()
        .fadeIn(500);
      this.managerDashboardHeader();
      this.managerDashboardRoomStats(hotel);
      this.managerDashboardDailyRevenue(hotel);
    }
  },

  customerDashboardHeader(currentUser) {
    $('.header-content').html(`
    <h2>Welcome, ${currentUser.name}</h2>
    `)
  },

  customerDashboardPastBookings(currentUser, currentDate) {
    let pastBookings = currentUser.allReservations.filter(res => res.numDate < Number(currentDate.split('/').join('')))
    pastBookings.map(booking => {
      $('.past-bookings').children('.booking').append(`
        <p>Date: ${booking.date}</p>
      `);
    })
  },


  customerDashboardCurrentBookings(currentUser, currentDate) {
    let currentBookings = currentUser.allReservations.filter(res => res.numDate >= Number(currentDate.split('/').join('')));
    currentBookings.reverse().map(booking => {    
      $('.current-bookings').children('.booking').append(`
        <p>Date: ${booking.date}</p>
      `);
    })
  },

  customerDashboardAvailableRooms(hotel) {
    let availableRooms = hotel.findAvailableRooms(hotel.currentDate);
    availableRooms.map(room => {
      $('.available-rooms-list').append(`
        <div class="room-listing">
          <p>Room Number: ${room.roomNumber}</p>
          <p>Room Type: ${room.roomType.toUpperCase()}</p>
          <p>Number of Beds: ${room.numBeds}</p>
          <p>Bed Size: ${room.bedSize.toUpperCase()}</p>
          <p>Bidet: ${room.bidet}</p>
          <p>Cost Per Night: ${room.costPerNight.toLocaleString("en-US", {style:"currency", currency:"USD"})}</p>
        </div>
      `)
    })
  },

  customerDashboardFinancialInfo(total) {
    $('.financial').html(`
    <h3>Amount spent: <span class="customer-amt-spent">${total}</span></h3>
    `);
  },

  managerDashboardHeader() {
    $('.header-content').html(`
    <h2>Welcome, Manager</h2>
    `)
  },

  managerDashboardRoomStats(hotel) {
    $('.left-dashboard-content').html(`
      <div class="past-bookings">
        <h3>Rooms Available Today: ${hotel.findAvailableRooms(hotel.currentDate).length}</h3>
      </div>
      <div class="current-bookings">
      <h3>Percentage of Occupancy Today: ${hotel.calculatePercentageRoomsBooked() + '%'}</h3>
      </div>
    `)
  },

  //manager make reservation

  managerDashboardDailyRevenue(hotel) {
    hotel.calculateDailyRevenueFromRooms();
    $('.financial').html(`
      <h3>Revenue for the Day: <span class="customer-amt-spent">${hotel.sales}</span></h3>
    `)
  }
}

export default domUpdates;