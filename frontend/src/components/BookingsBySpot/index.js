import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { useParams } from 'react-router-dom';

import { deleteABooking, getSpotBookings } from '../../store/bookings';

function BookingsBySpot() {
  const dispatch = useDispatch()
  const { id } = useParams()
  const sessionUser = useSelector(state => state.session.user)


  useEffect(() => {
    dispatch(getSpotBookings(id))
  }, [dispatch, id])

  const bookingsObj = useSelector(state => state.bookings)
  const bookings = Object.values(bookingsObj)

  if (!bookingsObj) return null
  if (!bookings) return null

  const handleDeleteClick = async (e) => {
    await dispatch(deleteABooking())
  }


  function bookingButtons(sessionUser, booking) {
    if (sessionUser.id === booking.userId) {
      return (
        <div>
          <button onClick={handleDeleteClick}>Delete Booking</button>
        </div>
      )
    }
  }

  return (
    <div>
      <p>BOOKINGS</p>

      {bookings.map(booking =>
        <div key={booking.id}>
          {/* - NAME: {booking.User.firstName} {booking.User.lastName} */}
          <br />
          <br />
          - START: {booking.startDate}
          <br />
          <br />
          - END: {booking.endDate}
          <br />
          <br />
          <br />
          <br />
          {bookingButtons(sessionUser, booking)}
        </div>
      )}

    </div>
  )
}

export default BookingsBySpot