import { csrfFetch } from "./csrf";

const GET_SPOTS = 'spots/GETSPOTS'
const GET_A_SPOT = 'spots/GETASPOT'
const GET_OWNER_SPOTS = 'spots/GETOWNERSPOTS'
const CREATE_A_SPOT = 'spots/CREATE'

const getSpots = (spots) => {
  return {
    type: GET_SPOTS,
    spots
  }
}

const getASpot = (spot) => {
  return {
    type: GET_A_SPOT,
    spot
  }
}

const getSpotByOwner = (spots) => {
  return {
    type: GET_OWNER_SPOTS,
    spots
  }
}

const createSpot = (newSpot) => {
  return {
    type: CREATE_A_SPOT,
    newSpot
  }
}

export const getAllSpots = () => async (dispatch) => {
  const response = await csrfFetch('/api/spots')
  if (response.ok) {
    const spots = await response.json()
    dispatch(getSpots(spots))
  }
}

export const getOneSpot = (id) => async (dispatch) => {
  const response = await csrfFetch(`/api/spots/${id}`)
  if (response.ok) {
    const spot = await response.json()
    dispatch(getASpot(spot))
  }
}

export const getOwnerSpots = () => async (dispatch) => {
    const response = await csrfFetch('/api/spots/current')
    const spots = await response.json()
    dispatch(getSpotByOwner(spots))
}

export const createASpot = (payload) => async (dispatch) => {
  const response = await csrfFetch('/api/spots', {
    method: 'POST', 
    body: JSON.stringify(payload)
  })
  if (response.ok){
    const newSpot = await response.json()
    dispatch(createSpot(newSpot))
    return newSpot
  }
}

const initialState = {}

const spotReducer = (state = initialState, action) => {  
  switch (action.type) {
    case GET_SPOTS:
      const allSpots = {}
      action.spots.forEach(spot => {
        allSpots[spot.id] = spot;
      })
      return {...state, ...allSpots}
    case GET_A_SPOT:
      let oneSpot = {...state}
      oneSpot[action.spot.id] = action.spot
      return oneSpot
    case GET_OWNER_SPOTS:
      const ownerSpots = {}
      action.spots.Spots.forEach(spot => {
        ownerSpots[spot.id] = spot;
      })
      return ownerSpots
    case CREATE_A_SPOT:
      return {...state, [action.newSpot.id]: action.newSpot}
    default:
      return state;
  }
}

export default spotReducer;