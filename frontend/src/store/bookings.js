import { csrfFetch } from "./csrf";

const GET_USER_BOOKINGS = 'bookings/GETUSERBOOKINGS'
const GET_SPOT_BOOKINGS = 'bookings/GETSPOTBOOKINGS'
const CREATE_BOOKING = 'bookings/CREATEBOOKING'
const UPDATE_BOOKING = 'bookings/UPDATEBOOKING'
const DELETE_BOOKING = 'bookings/DELETE'

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

const createBooking = (booking) => {
  return {
    type: CREATE_BOOKING, 
    booking
  }
}

const updateBooking = (booking) => {
  return {
    type: UPDATE_BOOKING,
    booking
  }
}

const deleteBooking = (bookingId) => {
  return {
    type: DELETE_BOOKING, 
    bookingId
  }
}

export const getUserBookings = () => async (dispatch) => {
  const response = await csrfFetch('/api/bookings/current')

  if (response.ok) {
    const bookings = await response.json()
    dispatch(getBookingsByUser(bookings))
  }
}

export const getSpotBookings = (id) => async (dispatch) => {
  console.log("ID", id)
  const response = await csrfFetch(`/api/spots/${id}/bookings`)

  if (response.ok) {
    const bookings = await response.json()
    dispatch(getBookingsBySpot(bookings))
  }
}

export const createABooking = (payload) => async (dispatch) => {
  const response = await csrfFetch(`/api/spots/${payload.spotId}/bookings`, {
    method: 'POST',
    body: JSON.stringify(payload)
  })
  if (response.ok) {
    const newBooking = await response.json()
    dispatch(createBooking(newBooking))
    return newBooking
  }
}

export const updateABooking = (payload) => async (dispatch) => {
  const response = await csrfFetch(`/api/bookings/${payload.bookingId}`, {
    method: 'PUT',
    body: JSON.stringify(payload)
  })
  if (response.ok) {
    const updatedBooking = await response.json()
    dispatch(updateBooking(updatedBooking))
    return updatedBooking
  }
}

export const deleteABooking = (bookingId) => async (dispatch) => {
  const response = await csrfFetch(`/api/bookings/${bookingId}`, {
    method: 'DELETE'
  })
  if (response.ok) {
    dispatch(deleteBooking(bookingId))
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
      action.bookings.forEach(booking => {
        spotBookings[booking.id] = booking
      })
      return { ...spotBookings }
    case CREATE_BOOKING:
      return {...state, [action.bookings.id]: action.newBooking}
    case UPDATE_BOOKING:
      const updatedState = {...state}
      updatedState[action.updatedBooking.id] = action.updatedBooking
      return updatedState
    case DELETE_BOOKING:
      const deleteState = { ...state }
      delete deleteState[action.id]
      return deleteState
    default:
      return state;
  }
}

export default bookingReducer