import { csrfFetch } from "./csrf";

const GET_SPOTS = 'spots/GETSPOTS'

const getSpots = (spots) => {
  return {
    type: GET_SPOTS,
    spots
  }
}



export const getAllSpots = () => async (dispatch) => {
  const response = await csrfFetch('/api/spots')
  if (response.ok){
    const spots = await response.json()
    dispatch(getSpots(spots))
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
      let newState = {...state, ...allSpots}
      return newState
    default:
      return state;
  }
}

export default spotReducer;