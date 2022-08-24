import { csrfFetch } from "./csrf";

const GET_SPOTS = 'spots/GETSPOTS'
const GET_A_SPOT = 'spots/GETASPOT'
const GET_OWNER_SPOTS = 'spots/GETOWNERSPOTS'
const CREATE_A_SPOT = 'spots/CREATE'
const UPDATE_A_SPOT = 'spots/UPDATESPOT'
const DELETE_A_SPOT = 'spots/DELETEASPOT'

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

const updateSpot = (updatedSpot) => {
  return {
    type: UPDATE_A_SPOT,
    updatedSpot
  }
}

const deleteSpot = (spotId) => {
  return {
    type: DELETE_A_SPOT,
    spotId
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

export const updateASpot = (payload) => async (dispatch) => {
  const response = await csrfFetch(`/api/spots/${payload.id}`, {
    method: 'PUT',
    body: JSON.stringify(payload)
  })
  if (response.ok){
    const updatedSpot = await response.json()
    dispatch(updateSpot(updatedSpot))
    return updatedSpot
  }
}

export const deleteASpot = (spotId) => async (dispatch) => {
  const response = await csrfFetch(`/api/spots/${spotId}`, {
    method: 'DELETE'
  })
  if (response.ok){
    dispatch(deleteSpot(spotId))
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
      return {...allSpots}
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
    case UPDATE_A_SPOT:
      const updatedState = {...state}
      updatedState[action.updatedSpot.id] =  action.updatedSpot
      return updatedState
    case DELETE_A_SPOT:
      const deleteState = {...state}
      delete deleteState[action.id]
      return deleteState
    default:
      return state;
  }
}

export default spotReducer;