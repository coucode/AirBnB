import { useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { NavLink } from 'react-router-dom';
import { deleteABooking, getUserBookings } from '../../store/bookings';
import './BookingsByUser.css';

function BookingsByUser() {
  const dispatch = useDispatch()
  const sessionUser = useSelector(state => state.session.user);

  useEffect(() => {
    if (sessionUser) {
      dispatch(getUserBookings())
    }
  }, [dispatch, sessionUser])
  const bookingsObj = useSelector(state => state.bookings)
  let bookings;
  let loading = true;

  if (bookingsObj) {
    bookings = Object.values(bookingsObj)
    loading = false;
  }

  function imageCheck(spot) {
    if (spot?.previewImage) {
      return spot?.previewImage
    } else {
      return "https://st.depositphotos.com/1987177/3470/v/450/depositphotos_34700099-stock-illustration-no-photo-available-or-missing.jpg"
    }
  }

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

  function dateConverter(date) {
    let convertDate = new Date(date).toDateString()
    return convertDate
  }

  if (!bookings) return null


  return (
    <div className='bookings-by-user-container'>
      {(loading === false) && (bookings.length > 0) ? (
        <div className='bookings-by-user-inner-container'>
          <div className='future-bookings-container'>
            <div className='bookings-header'>
              Current and Upcoming Bookings
            </div>
            {futureBookings.map(booking => {
              return (
                <div key={booking.id} className='single-booking-container'>
                  <NavLink to={`/spots/${booking.spotId}`} className='single-booking-links'>
                    <div className='single-booking-links'>
                      <img
                        src={imageCheck(booking.Spot)}
                        alt="listing"
                        style={{ width: 125, height: 125 }}
                        onError={e => { e.currentTarget.src = "https://st.depositphotos.com/1987177/3470/v/450/depositphotos_34700099-stock-illustration-no-photo-available-or-missing.jpg" }}
                      />
                      <div className='single-booking-text'>
                        <p className='single-booking-name'>
                          {booking?.Spot.name}
                        </p>
                        <div className='single-booking-dates'>
                          <p style={{ fontWeight: '600', paddingRight: '10px' }}>
                            Check-In:
                          </p>
                          <p>
                            {dateConverter(booking?.startDate)}
                          </p>
                        </div>
                        <div className='single-booking-dates'>
                          <p style={{ fontWeight: '600', paddingRight: '10px' }}>
                            Check-Out:
                          </p>
                          <p>
                            {dateConverter(booking?.endDate)}
                          </p>
                        </div>
                      </div>
                    </div>
                  </NavLink>
                  <div className='delete-booking-container'>
                    <button onClick={(e) => {
                      dispatch(deleteABooking(booking.id))
                    }} className='delete-booking-button'>Delete Booking</button>
                  </div>

                </div>
              )
            })}
          </div>
          <div className='bookings-header'>
            Previous Bookings
          </div>
          {pastBookings.map(booking => {
            return (
              <div key={booking.id} className='single-booking-container'>
                <NavLink to={`/spots/${booking.spotId}`} className='single-booking-links'>
                  <div className='single-booking-links'>
                    <img
                      src={imageCheck(booking.Spot)}
                      alt="listing"
                      style={{ width: 125, height: 125 }}
                      onError={e => { e.currentTarget.src = "https://st.depositphotos.com/1987177/3470/v/450/depositphotos_34700099-stock-illustration-no-photo-available-or-missing.jpg" }}
                    />
                    <div className='single-booking-text'>
                      <p className='single-booking-name'>
                        {booking?.Spot.name}
                      </p>
                      <div className='single-booking-dates'>
                        <p style={{ fontWeight: '600', paddingRight: '10px' }}>
                          Check-In:
                        </p>
                        <p>
                          {dateConverter(booking?.startDate)}
                        </p>
                      </div>
                      <div className='single-booking-dates'>
                        <p style={{ fontWeight: '600', paddingRight: '10px' }}>
                          Check-Out:
                        </p>
                        <p>
                          {dateConverter(booking?.endDate)}
                        </p>
                      </div>
                    </div>
                  </div>
                </NavLink>
              </div>
            )
          })}
        </div>
      ) : (
        <div>
          Loading...
        </div>
      )}

    </div>
  )

  // return (
  //   <div className='bookings-by-user-container'>
  //     {(loading === false) && (bookings.length > 0) ? (
  //       <div className='bookings-by-user-inner-container'>
  //         {bookings.map(booking => {
  //           return (
  // <div key={booking.id} className='single-booking-container'>
  //   <NavLink to={`/spots/${booking.spotId}`} className='single-booking-links'>
  //     <div className='single-booking-links'>
  //       <img
  //         src={imageCheck(booking.Spot)}
  //         alt="listing"
  //         style={{ width: 125, height: 125 }}
  //         onError={e => { e.currentTarget.src = "https://st.depositphotos.com/1987177/3470/v/450/depositphotos_34700099-stock-illustration-no-photo-available-or-missing.jpg" }}
  //       />
  //       <div className='single-booking-text'>
  //         <p className='single-booking-name'>
  //           {booking?.Spot.name}
  //         </p>
  //         <div className='single-booking-dates'>
  //           <p style={{ fontWeight: '600', paddingRight: '10px' }}>
  //             Check-In:
  //           </p>
  //           <p>
  //             {booking?.startDate}
  //           </p>
  //         </div>
  //         <div className='single-booking-dates'>
  //           <p style={{ fontWeight: '600', paddingRight: '10px' }}>
  //             Check-Out:
  //           </p>
  //           <p>
  //             {booking?.endDate}
  //           </p>
  //         </div>
  //       </div>
  //     </div>
  //   </NavLink>
  //   <div className='delete-booking-container'>
  //     <button onClick={(e) => {
  //       dispatch(deleteABooking(booking.id))
  //     }} className='delete-booking-button'>Delete Booking</button>
  //   </div>

  // </div>
  //           )
  //         })}
  //       </div>

  //     ) : (
  //       <div>
  //       </div>
  //     )}
  //   </div>
  // )
}

export default BookingsByUser;