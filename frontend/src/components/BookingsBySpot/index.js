import { useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { useParams } from 'react-router-dom';
import { getSpotBookings } from '../../store/bookings';
import './BookingsBySpot.css'

function BookingsBySpot() {
  const dispatch = useDispatch()
  const { id } = useParams()
  let loading = true;

  // Gets all of the bookings for the spot specified in the URL
  useEffect(() => {
    dispatch(getSpotBookings(id))
  }, [dispatch, id])

  // Obtains the bookings from state, creates an array with that information
  let bookings;
  const bookingsObj = useSelector(state => state.bookings)
  if (bookingsObj) {
    bookings = Object.values(bookingsObj)
  }

  // Rerenders the component while state is loading
  if (!bookingsObj) return null
  if (!bookings) return null


  // Sorts the bookings into past and future arrays so they can be displayed separately. 
  // Created a variable for today's date, and change the string values to date values in order to compare
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
      loading = false;
    })
  }

  // Variable that is returned when there are no bookings
  let noBookings = (
    <div className='bookings-by-spot-info-container'>
      <p className='bookings-by-spot-info'>• No Bookings</p>
    </div>
  )
  if (!futureBookings) return null
  if (!pastBookings) return null

  return (
    <div className='bookings-by-spot-container'>
      {(loading === false) > 0 ? (
        <div>
          <p className='bookings-by-spot-header'>Bookings for your listing</p>
          <div className='bookings-by-spot-inner-container'>
            <div className='bookings-current-container'>
              <p className='bookings-date-headers'>Current and Upcoming Bookings</p>
              {/* Function checks if the array has no values, it will return a no bookings message, else map through the array and display information */}
              {(futureBookings?.length === 0) ? noBookings : futureBookings?.map(booking => {
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
              {/* Function checks if the array has no values, it will return a no bookings message, else map through the array and display information */}
              {(pastBookings?.length === 0) ? noBookings : pastBookings?.map(booking => {
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