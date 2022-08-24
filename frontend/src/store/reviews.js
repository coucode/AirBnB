import { csrfFetch } from "./csrf";

const GET_SPOT_REVIEWS = 'reviews/SPOT'
const CREATE_REVIEW = '/reviews/CREATE'

const getSpotReviews = (reviews) => {
  return {
    type: GET_SPOT_REVIEWS,
    reviews
  }
}

const createReview = (review) => {
  return {
    type: CREATE_REVIEW,
    review
  }
}

export const getAllSpotReviews = (id) => async dispatch => {
  const response = await csrfFetch(`/api/spots/${id}/reviews`)
  if (response.ok) {
    const reviews = await response.json()
    dispatch(getSpotReviews(reviews))
  }
}

export const createAReview = (payload) => async dispatch => {
  const response = await csrfFetch(`/api/spots/${payload.spotId}/reviews`, {
    method: 'POST', 
    body: JSON.stringify(payload)
  })
  if (response.ok){
    const review = await response.json()
    dispatch(createReview(review))
  }
}

const initialState = {}

const reviewReducer = (state = initialState, action) => {
  switch(action.type){
    case GET_SPOT_REVIEWS:
      const reviews = {}
      action.reviews.Reviews.forEach((review) => {
        reviews[review.id] = review
      })
      return reviews
      case CREATE_REVIEW:
      const createState = {...state}
      createState[action.review.id] = action.review
      return createState
    default:
      return state;
  }
}

export default reviewReducer;