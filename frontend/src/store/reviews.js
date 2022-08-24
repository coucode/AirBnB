import { csrfFetch } from "./csrf";

const GET_SPOT_REVIEWS = 'reviews/SPOT'

const getSpotReviews = (reviews) => {
  return {
    type: GET_SPOT_REVIEWS,
    reviews
  }
}

export const getAllSpotReviews = (id) => async dispatch => {
  const response = await csrfFetch(`/api/spots/${id}/reviews`)
  console.log("REVIEWRESPONSETHUNK", response)
  if (response.ok) {
    const reviews = await response.json()
    dispatch(getSpotReviews(reviews))
  }
}

const initialState = {}

const reviewReducer = (state = initialState, action) => {
  switch(action.type){
    case GET_SPOT_REVIEWS:
      console.log("STATE", state)
      console.log("ACTION", action)
      const reviews = {}
      action.reviews.Reviews.forEach((review) => {
        reviews[review.id] = review
      })
      return reviews
    default:
      return state;
  }
}

export default reviewReducer;