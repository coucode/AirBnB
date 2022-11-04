import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import { useParams, useHistory } from 'react-router-dom';
import { getAllSpotReviews } from '../../store/reviews';
import CreateReviewModal from '../CreateReviewModal';
import ConfirmDelete from '../ConfirmDeleteModal';

import './SpotReviews.css'

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
  if (!reviewCheck && !ownerCheck && sessionUser) {
    reviewButton = (
      <CreateReviewModal />
    )
  }


  // This checks if the current review belongs to the currently signed in user. If so, the delete button will appear
  function deleteCheck(review) {
    if (review && sessionUser) {
      if (review?.User?.id === sessionUser?.id) {
        return (
          <ConfirmDelete input={review} type='review' />
        )
      }
    }
  }

  return (
    <div>
      <div className='review_top_button'>
      {reviewButton}

      </div>
      {reviews.length > 0 ? (
        <>
          {reviews.map(review => {
            return (
              <div key={review?.id} className="review_container">
                <div className="review_container_inner">

                <div className='review_user_info'>
                  <div className='review_user_icon'>
                    <img src="https://icon-library.com/images/default-user-icon/default-user-icon-13.jpg" alt="icon"></img>
                  </div>
                  <div className='review_user_details'>
                    <p className='review_user_name'>{review?.User?.firstName}</p>
                    <p className='review_user_date'>{dateConverter(review)}</p>
                  </div>
                  <div className='review_delete'>
                    {deleteCheck(review)}
                  </div>
                </div>
                <div className="review_review">
                  <p>{review?.review}</p>
                </div>
                </div>
              </div>
            )
          })}
        </>

      ) : (<h3 className='noData'>No Reviews</h3>)}

    </div>
  )

}

export default SpotReviews;