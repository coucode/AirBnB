import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import { useParams, useHistory } from 'react-router-dom';
import { deleteAReview, getAllSpotReviews } from '../../store/reviews';
import CreateReviewModal from '../CreateReviewModal';

function SpotReviews({ spot }) {
  const dispatch = useDispatch()
  const { id } = useParams()
  const history = useHistory()
  const reviewsObj = useSelector(state => state.reviews)
  const sessionUser = useSelector(state => state.session.user)
  const reviews = Object.values(reviewsObj)

  useEffect(() => {
    dispatch(getAllSpotReviews(id))
  }, [dispatch, id])

  if (!reviews) return null

  function dateConverter(review) {
    if (review) {
      let date = new Date(review.createdAt)
      const options = { month: 'long', year: 'numeric' }
      date = date.toLocaleDateString(undefined, options)
      return date
    }
  }
  /* Renders the create a review button if the user does not have an existing review and is not the owner*/
  // This checks if the current user has a review
  let reviewCheck = false;
  if (reviews && sessionUser) {
    reviewCheck = reviews.find((review) => review.userId === sessionUser.id)
  }
  // This checks if the current user is the owner of the spot/listing
  let ownerCheck = false;
  if (spot && sessionUser) {
    if (spot.ownerId === sessionUser.id) {
      ownerCheck = true;
    }
  }
  // This renders the Create Review button so long as a review does not exist and the user is not the owner
  let reviewButton;
  if (!reviewCheck && !ownerCheck) {
    reviewButton = (
      <CreateReviewModal />
    )
  }
  // This deletes the review and rerenders the spot details
  const handleDeleteClick = async (e) => {
    await dispatch(deleteAReview(reviewCheck.id))
    await history.push(`/spots/${id}`)
  }

  // This checks if the current review belongs to the currently signed in user. If so, the delete button will appear
  function deleteCheck(review) {
    if (review && sessionUser) {
      if (review.User.id === sessionUser.id) {
        return (
          <button onClick={handleDeleteClick}>Delete Review</button>
        )
      }
    }
  }

  return (
    <div>
      {reviewButton}
      {reviews.length > 0 ? (
        <>
          {reviews.map(review => {
            return (
              <div key={review?.id}>
                <div>
                  <p>{review?.User?.firstName}</p>
                  <p>{dateConverter(review)}</p>
                </div>
                <div>
                  {deleteCheck(review)}
                </div>
                <div>
                  <p>{review?.review}</p>
                </div>
              </div>
            )
          })}
        </>

      ) : (<h3>No Reviews</h3>)}

    </div>
  )

}

export default SpotReviews;