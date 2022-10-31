import { useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { deleteABooking, getUserBookings } from '../../store/bookings';


function BookingsByUser(){
  const dispatch = useDispatch()
  const sessionUser = useSelector(state => state.session.user);

  useEffect(() => {
    if (sessionUser){
      dispatch(getUserBookings())
    }
  }, [dispatch, sessionUser])
  const bookingsObj = useSelector(state => state.bookings)
  let bookings;
  let loading = true;

  if (bookingsObj){
    bookings = Object.values(bookingsObj)
    loading = false;
  }

  return (
    <div>
      {(loading === false) && (bookings.length > 0) ? (
        <>
        {bookings.map(booking => {
          return (
            <div key = {booking.id}>
              {booking.Spot.name}
              <br/>
              - START: {booking.startDate}
              <br />
              - END: {booking.endDate}
              <br />
              <br />
              <button onClick={(e)  => {
                dispatch(deleteABooking(booking.id))
              }}>Delete Booking</button>
              <br />
              <br />
            </div>
          )
        })}
        </>

      ): (
          <div>
          </div>
      )}
    </div>
  )
}

export default BookingsByUser;