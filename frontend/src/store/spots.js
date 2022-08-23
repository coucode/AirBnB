import { csrfFetch } from "./csrf";

const GET_SPOTS = 'spots/GETSPOTS'
const GET_A_SPOT = 'spots/GETASPOT'
const GET_OWNER_SPOTS = 'spots/GETOWNERSPOTS'
// const FETCH_FAIL = 'spots/FAIL'

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

// const errorMessage = (err) => {
//   return {
//     type: FETCH_FAIL,
//     err
//   }
// }


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
  // try {
    const response = await csrfFetch('/api/spots/current')
    const spots = await response.json()
    dispatch(getSpotByOwner(spots))
  // } catch (err){
  //   const error = await err.json()
  //   dispatch(errorMessage(error))
  // }
}

const initialState = {}

const spotReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_SPOTS:
      const allSpots = {}
      action.spots.forEach(spot => {
        allSpots[spot.id] = spot;
      })
      let newState = { ...state, ...allSpots }
      return newState
    case GET_A_SPOT:
      let oneSpot = {...state}
      let details = oneSpot[action.spot.id]
      details["detail"] = action.spot
      return oneSpot
    case GET_OWNER_SPOTS:
      const ownerSpots = {}
      action.spots.Spots.forEach(spot => {
        ownerSpots[spot.id] = spot;
      })
      return {...ownerSpots}
    // case FETCH_FAIL: 
    // return {...state, error: action.err.message}
    default:
      return state;
  }
}

export default spotReducer;