import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import { useParams, useHistory } from 'react-router-dom';
import { deleteAReview, getAllSpotReviews } from '../../store/reviews';
import CreateReviewModal from '../CreateReviewModal';

function SpotReviews() {
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
  let reviewCheck = false;
  if (reviews && sessionUser) {
    reviewCheck = reviews.find((review) => review.userId === sessionUser.id)
  }
  let reviewButton;
  if (!reviewCheck) {
    reviewButton = (
      <CreateReviewModal />
    )
  }
  let deleteButton;
  const handleDeleteClick = async (e) => {
    await dispatch(deleteAReview(reviewCheck.id))
    await history.push(`/spots/${id}`)
  }
  if (reviewCheck) {
    deleteButton = (
      <button onClick={handleDeleteClick}>Delete Review</button>
    )
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
                  {deleteButton}
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