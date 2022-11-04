import { useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { useParams } from 'react-router-dom';

import { deleteABooking, getSpotBookings } from '../../store/bookings';
import './BookingsBySpot.css'

function BookingsBySpot() {
  const dispatch = useDispatch()
  const { id } = useParams()
  const sessionUser = useSelector(state => state.session.user)
  let loading = true;


  useEffect(() => {
    dispatch(getSpotBookings(id))
  }, [dispatch, id])

  let bookings;
  const bookingsObj = useSelector(state => state.bookings)
  if (bookingsObj) {
    bookings = Object.values(bookingsObj)
    loading = false;
  }

  if (!bookingsObj) return null
  if (!bookings) return null


  let currentDate = new Date()
  let pastBookings = []
  let futureBookings = []
  if (bookings) {
    bookings.forEach(booking => {
      let convertDate = new Date(booking.startDate)
      if (convertDate < currentDate) {
        pastBookings.push(booking)
      }
      if (convertDate >= currentDate) {
        futureBookings.push(booking)
      }
    })
  }

  let noBookings = (
    <div className='bookings-by-spot-info-container'>
      <p className='bookings-by-spot-info'>• No Bookings</p>
    </div>
  )

  return (
    <div className='bookings-by-spot-container'>
      {(loading === false) > 0 ? (
        <div>
          <p className='bookings-by-spot-header'>Bookings for your listing</p>
          <div className='bookings-by-spot-inner-container'>
            <div className='bookings-current-container'>
              <p className='bookings-date-headers'>Current and Upcoming Bookings</p>
              {(futureBookings?.length === 0) ? noBookings : futureBookings.map(booking => {
                return (
                  <div key={booking.id} className='bookings-by-spot-info-container'>
                    <p className='bookings-by-spot-info'>
                      • <b>{booking.User.firstName} {booking.User.lastName}</b> from <b>{booking.startDate}</b>   to <b>{booking.endDate} </b>
                    </p>
                  </div>
                )
              })}
            </div>
            <div>
              <p className='bookings-date-headers'>Past Bookings</p>
              {(pastBookings?.length === 0) ? noBookings : pastBookings.map(booking => {
                return (
                  <div key={booking.id} className='bookings-by-spot-info-container'>
                    <p className='bookings-by-spot-info'>
                      • <b>{booking.User.firstName} {booking.User.lastName} </b> from <i>{booking.startDate} </i>  to <i>{booking.endDate} </i>
                    </p>
                  </div>
                )
              })
              }
            </div>
          </div>
        </div>
      ) : (
        <div> Loading... </div>
      )
      }
    </div>
  )
}

export default BookingsBySpot