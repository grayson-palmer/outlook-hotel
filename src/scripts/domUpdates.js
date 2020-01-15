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
      this.customerDashboardAvailableRooms(hotel, hotel.currentDate, currentUser);
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
      this.managerDashboardUserInformation(hotel);
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

  customerDashboardAvailableRooms(hotel, date, currentUser) {
    let availableRooms = hotel.findAvailableRooms(date);
    if (availableRooms !== undefined) {
      availableRooms.map(room => {
        $('.available-rooms-list').append(`
          <div class="room-listing" data-id="${room.roomNumber}">
            <p>Room Number: ${room.roomNumber}</p>
            <p>Room Type: ${room.roomType.toUpperCase()}</p>
            <p>Number of Beds: ${room.numBeds}</p>
            <p>Bed Size: ${room.bedSize.toUpperCase()}</p>
            <p>Bidet: ${room.bidet}</p>
            <p>Cost Per Night: ${room.costPerNight.toLocaleString("en-US", {style:"currency", currency:"USD"})}</p>
            <button type="button" class="book-room" id="${room.roomNumber}">Book Room</button>
          </div>
        `)
      })
    } else {
      $('.available-rooms-list').html(`<p class="no-rooms">We would like to offer our most sincere apologies, but it appears we do not have any openings for ${date}.</p>`)
    }
    $('.book-room').click(function() {
      currentUser.makeReservation({
        userID: currentUser.id,
        date: date,
        roomNumber: event.target.id
      });
      event.target.parentNode.remove();
      window.alert(`Your reservation has been made for Room Number ${event.target.id} on ${date}`);
    });
  },

  customerDashboardFinancialInfo(total) {
    $('.financial').html(`
    <h3>Amount spent: <span class="customer-amt-spent">${total.toLocaleString("en-US", {style:"currency", currency:"USD"})}</span></h3>
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

  managerDashboardUserInformation(hotel) {
    $('.center-dashboard-content').html(`
      <div class="manager-reservation-container">
        <button type="button" class="manager-reservation-button">Make User Reservation</button>
      </div>
      <div class="manager-user-bookings">
        <div class="past-bookings">
          <h3>Past Bookings</h3>
          <div class="booking"></div>
        </div>
        <div class="current-bookings">
          <h3>Current Bookings</h3>
          <div class="booking"></div>
        </div>
      </div>
    `);
    $('.manager-reservation-button').click(function() {
      $('.center-dashboard-content').html(`
        <div class="book-room-container">
          <form class="book-room-form">
            <div>
              <label for="date" required>Select a date<span class="required">*</span>:</label>
              <input type="date" id="date">
            </div>
            <div>
              <label for="room-type">Select a room type:</label>
              <select name="type-of-room" class="room-type" id="room-type">
                <option value="all">All</option>
                <option value="residential suite">Residential Suite</option>
                <option value="suite">Suite</option>
                <option value="single room">Single Room</option>
                <option value="junior suite">Junior Suite</option>
              </select>
            </div>
            <button type="button" class="search-button">Search Availability</button>
          </form>
          <div class="available-rooms-list"></div>
        </div>
      `);
      let availableRooms = hotel.findAvailableRooms(hotel.currentDate);
      console.log(availableRooms);
      $('.available-rooms-list').children().remove();
      if (availableRooms !== undefined) {
        availableRooms.map(room => {
          $('.available-rooms-list').append(`
            <div class="room-listing" data-id="${room.roomNumber}">
              <p>Room Number: ${room.roomNumber}</p>
              <p>Room Type: ${room.roomType.toUpperCase()}</p>
              <p>Number of Beds: ${room.numBeds}</p>
              <p>Bed Size: ${room.bedSize.toUpperCase()}</p>
              <p>Bidet: ${room.bidet}</p>
              <p>Cost Per Night: ${room.costPerNight.toLocaleString("en-US", {style:"currency", currency:"USD"})}</p>
              <button type="button" class="book-room" id="${room.roomNumber}">Book Room</button>
            </div>
          `)
        })
      } else {
        $('.available-rooms-list').html(`<p class="no-rooms">We would like to offer our most sincere apologies, but it appears we do not have any openings for ${date}.</p>`)
      }
      $('.book-room').click(function() {
        console.log(hotel.manager.selectedUser);
        hotel.manager.selectedUser.makeReservation({
          userID: hotel.manager.selectedUser.id,
          date: hotel.currentDate,
          roomNumber: event.target.id
        });
        event.target.parentNode.remove();
        window.alert(`Your reservation has been made for Room Number ${event.target.id} on ${date}`);
      });
    })
  },

  managerDashboardDailyRevenue(hotel) {
    hotel.calculateDailyRevenueFromRooms();
    $('.financial').html(`
      <h3>Revenue for the Day: <span class="customer-amt-spent">${hotel.sales.toLocaleString("en-US", {style:"currency", currency:"USD"})}</span></h3>
      <div class="manager-search">
        <p>User Search:</p>
        <div class="search-container">
          <input type="text" class="search-users" placeholder="Enter a user ID">
          <button type="button" class="search-users-button">Search Users</button>
        </div>
        <div class="search-users-results"></div>
      </div>
    `)
    $('.search-users-button').click(function() {
      let foundGuest = hotel.guests.find(guest => {
        return parseInt($('.search-users').val()) === guest.id;
      })
      hotel.manager.selectedUser = foundGuest;
      $('.search-users-results').html(`
        <p>${foundGuest.name}</p>
      `)
      hotel.manager.selectedUser.findReservations(hotel.bookings);
      hotel.manager.selectedUser.sortReservations();
      let pastBookings = hotel.manager.selectedUser.allReservations.filter(res => res.numDate < Number(hotel.currentDate.split('/').join('')))
      pastBookings.map(booking => {
        $('.past-bookings').children('.booking').append(`
          <p>Date: ${booking.date}</p>
        `);
      })
      let currentBookings = hotel.manager.selectedUser.allReservations.filter(res => res.numDate >= Number(hotel.currentDate.split('/').join('')));
      currentBookings.reverse().map(booking => {    
        $('.current-bookings').children('.booking').append(`
        <p>Date: ${booking.date} <button type="button" class="delete-reservation" id="${booking.id}">Delete</button></p>
        `);
      })
      $('.delete-reservation').click(function() {
        console.log(this.id);
        hotel.manager.deleteBooking(this.id);
        event.target.parentNode.remove();
        window.alert(`Your reservation has been deleted`);
      })
    });
  },

  roomSearchUpdateDom(date, type, hotel, currentUser) {
    let availableRooms = hotel.findAvailableRooms(date);
    if (type === 'all') {type = ['residential suite', 'suite', 'single room', 'junior suite']};
    let filteredRooms = availableRooms.filter(room => type.includes(room.roomType));
    $('.available-rooms-list').children().remove();
    if (filteredRooms !== undefined) {
      filteredRooms.map(room => {
        $('.available-rooms-list').append(`
          <div class="room-listing" data-id="${room.roomNumber}">
            <p>Room Number: ${room.roomNumber}</p>
            <p>Room Type: ${room.roomType.toUpperCase()}</p>
            <p>Number of Beds: ${room.numBeds}</p>
            <p>Bed Size: ${room.bedSize.toUpperCase()}</p>
            <p>Bidet: ${room.bidet}</p>
            <p>Cost Per Night: ${room.costPerNight.toLocaleString("en-US", {style:"currency", currency:"USD"})}</p>
            <button type="button" class="book-room" id="${room.roomNumber}">Book Room</button>
          </div>
        `)
      })
    } else {
      $('.available-rooms-list').html(`<p class="no-rooms">We would like to offer our most sincere apologies, but it appears we do not have any openings for ${date}.</p>`)
    }
    $('.book-room').click(function() {
      currentUser.makeReservation({
        userID: currentUser.id,
        date: date,
        roomNumber: event.target.id
      });
      event.target.parentNode.remove();
      window.alert(`Your reservation has been made for Room Number ${event.target.id} on ${date}`);
    });
  }
}

export default domUpdates;