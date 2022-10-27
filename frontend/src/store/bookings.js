import { csrfFetch } from "./csrf";

const GET_USER_BOOKINGS = 'bookings/GETUSERBOOKINGS'
const GET_SPOT_BOOKINGS = 'bookings/GETSPOTBOOKINGS'

const getBookingsByUser = (bookings) => {
  return {
    type: GET_USER_BOOKINGS, 
    bookings
  }
}

const getBookingsBySpot = (bookings) => {
  return {
    type: GET_SPOT_BOOKINGS,
    bookings
  }
}

export const getUserBookings = () => async (dispatch) => {
  const response = await csrfFetch('/api/bookings/current')

  if (response.ok) {
    const bookings = await response.json()
    dispatch(getBookingsByUser(bookings))
  }
}

export const getSpotBookings = (payload) => async (dispatch) => {
  const response = await csrfFetch(`/api/spots/${payload}/bookings`)

  if (response.ok) {
    const bookings = await response.json()
    dispatch(getBookingsBySpot(bookings))
  }
}

const initialState = {}

const bookingReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_USER_BOOKINGS: 
      const allBookings = {}
      action.bookings.Bookings.forEach(booking => {
        allBookings[booking.id] = booking
      })
      return {...allBookings}
    case GET_SPOT_BOOKINGS:
      const spotBookings = {}
      action.bookings.Bookings.forEach(booking => {
        spotBookings[booking.id] = booking
      })
      return { ...spotBookings }
    default:
      return state;
  }
}

export default bookingReducer