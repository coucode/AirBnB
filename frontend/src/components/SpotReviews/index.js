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
  // console.log("REVIEWSOBJ",reviewsObj)
  const reviews = Object.values(reviewsObj)
  // console.log("REVIEWSARR", reviews)

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
  const handleDeleteClick = async (e) => {
    await dispatch(deleteAReview(reviewCheck.id))
    await history.push(`/spots/${id}`)
  }
  if (reviewCheck){
    reviewButton = (
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
                <p>{review?.User?.firstName}</p>
                <p>{dateConverter(review)}</p>
                <p>{review?.review}</p>
              </div>
            )
          })}
        </>

      ) : (<h3>No Reviews</h3>)}

    </div>
  )

}

export default SpotReviews;