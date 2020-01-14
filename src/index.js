// This is the JavaScript entry file - your code begins here
// Do not delete or rename this file ********

// An example of how you import jQuery into a JS file if you use jQuery in that file
import $ from 'jquery';
// import moment from 'moment';

// An example of how you tell webpack to use a CSS (SCSS) file
import './css/base.scss';
import Hotel from './scripts/Hotel';
import User from './scripts/User';
import Booking from './scripts/Booking';
import Room from './scripts/Room';
import domUpdates from './scripts/domUpdates';


let hotel;
let currentUser;
let userIds = [];

$(document).ready(() => {
  hotel = new Hotel();
  hotel.findCurrentDate();
  getGuests();
  getBookings();
  getRooms();
});

$('.submit-button').on('click', checkLogin);

const getGuests = () => {
  fetch('https://fe-apps.herokuapp.com/api/v1/overlook/1904/users/users')
    .then(response => response.json())
    .then(data => data.users)
    .then(userData => {
      userData.forEach(customer => {
        customer = new User(customer);
        hotel.guests.push(customer);
      })
    })
    .catch(err => console.log('Something wrong with users'));
}

const getBookings = () => {
  fetch('https://fe-apps.herokuapp.com/api/v1/overlook/1904/bookings/bookings')
    .then(response => response.json())
    .then(data => data.bookings)
    .then(bookingData => {
      bookingData.forEach(booking => {
        booking = new Booking(booking);
        hotel.bookings.push(booking);
      })
    })
    .catch(err => console.log('Something wrong with bookings'));
}

const getRooms = () => {
  fetch('https://fe-apps.herokuapp.com/api/v1/overlook/1904/rooms/rooms')
    .then(response => response.json())
    .then(data => data.rooms)
    .then(roomData => {
      roomData.forEach(room => {
        room = new Room(room);
        hotel.rooms.push(room);
      })
    })
    .catch(err => console.log('Something wrong with rooms'));
}

const getUserIds = () => {
  hotel.guests.forEach(user => {
    userIds.push(user.id);
  })
}

// Getting an error when formatted as ES6 for some reason...
function checkLogin() {
  getUserIds();
  if ($('#username').val() === 'manager' && $('#password').val() === 'overlook2019') {
    currentUser = 'manager'
    domUpdates.showDashboard('manager');
  } else if (userIds.find(i => `customer${i}` === $('#username').val()) && $('#password').val() === 'overlook2019') {
    currentUser = hotel.guests.find(g => (`customer${g.id}`) === $('#username').val())
    currentUser.findReservations(hotel.bookings);
    currentUser.sortReservations();
    domUpdates.showDashboard('customer', currentUser);
  } else {
    alert('The username or password entered does not match our system. Please try again.');
  }
}





