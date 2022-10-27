import { useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { useParams } from 'react-router-dom';

import { getSpotBookings } from '../../store/bookings';

function BookingsBySpot(){
  const dispatch = useDispatch()
  const { id } = useParams()

  useEffect(() => {
    dispatch(getSpotBookings(id))
  }, [dispatch, id])

  const bookingsObj = useSelector(state => state.bookings)
  const bookings = Object.values(bookingsObj)

  if (!bookingsObj) return null
  if (!bookings) return null

  return (
    <div>
      <p>BOOKINGS</p>

        {bookings.map(booking => 
          <div>
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
          </div>
        )}

    </div>
  )
}

export default BookingsBySpot