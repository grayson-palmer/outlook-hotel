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
    $('.customer-amt-spent').text(total);
  }
}

export default domUpdates;