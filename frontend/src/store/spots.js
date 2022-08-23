import { csrfFetch } from "./csrf";

const GET_SPOTS = 'spots/GETSPOTS'
const GET_A_SPOT = 'spots/GETASPOT'

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
    default:
      return state;
  }
}

export default spotReducer;