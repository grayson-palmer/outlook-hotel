// This is the JavaScript entry file - your code begins here
// Do not delete or rename this file ********

// An example of how you import jQuery into a JS file if you use jQuery in that file
import $ from 'jquery';
// import moment from 'moment';

// An example of how you tell webpack to use a CSS (SCSS) file
import './css/base.scss';
import Hotel from './scripts/Hotel';


let hotel;
$(document).ready(() => {
  hotel = new Hotel();
  hotel.findCurrentDate();
  getGuests();
  getBookings();
  getRooms();
  console.log(hotel);
})

const getGuests = () => {
  fetch('https://fe-apps.herokuapp.com/api/v1/overlook/1904/users/users')
    .then(response => response.json())
    .then(result => hotel.loadGuests(result.users))
    .catch(err => console.log('Something wrong with users'));
}

const getBookings = () => {
  fetch('https://fe-apps.herokuapp.com/api/v1/overlook/1904/bookings/bookings')
    .then(response => response.json())
    .then(result => hotel.loadBookings(result.bookings))
    .catch(err => console.log('Something wrong with bookings'));
}

const getRooms = () => {
  fetch('https://fe-apps.herokuapp.com/api/v1/overlook/1904/rooms/rooms')
    .then(response => response.json())
    .then(result => hotel.loadRooms(result.rooms))
    .catch(err => console.log('Something wrong with rooms'));
}




