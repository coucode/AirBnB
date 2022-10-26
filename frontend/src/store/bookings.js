import { csrfFetch } from "./csrf";

const GET_USER_BOOKINGS = 'bookings/GETUSERBOOKINGS'

const getBookingsByUser = (bookings) => {
  return {
    type: GET_USER_BOOKINGS, 
    bookings
  }
}

export const getUserBookings = () => async (dispatch) => {
  const response = await csrfFetch('/api/bookings/current')

  if (response.ok) {
    const bookings = await response.json()
    dispatch(getBookingsByUser)
  }
}

const initialState = {}

const bookingReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_USER_BOOKINGS: 
      const allBookings = {}
      action.bookings.forEach(booking => {
        allBookings[booking.id] = booking
      })
      return {...allBookings}
    default:
      return state;
  }
}

export default bookingReducer