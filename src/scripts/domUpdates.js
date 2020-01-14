import $ from 'jquery';

const domUpdates = {
  
  showDashboard(userType, currentUser) {
    if (userType === 'customer') {
      $('.login-container').fadeOut(500);
      $('.dashboard')
        .delay(500)
        .css("display", "grid")
        .hide()
        .fadeIn(500);
      this.customerDashboardHeader(currentUser);
      this.customerDashboardPastBookings(currentUser);
    } 
  },

  customerDashboardHeader(currentUser) {
    $('.header-content').html(`
    <h2>Welcome, ${currentUser.name}</h2>
    `)
  },

  customerDashboardPastBookings(currentUser) {
    $('.past-bookings').children('.booking').html(`
      <p>Date: 2020/01/19 from interp</p>
      <p>Date: 2020/01/20</p>
      <p>Date: 2020/01/21</p>
    `)
  }
}

export default domUpdates;