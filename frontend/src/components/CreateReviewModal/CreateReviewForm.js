import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useParams } from 'react-router-dom';
import { createAReview, getAllSpotReviews } from '../../store/reviews';

function CreateReviewForm() {
  const { id } = useParams()
  const dispatch = useDispatch()
  const history = useHistory()
  const sessionUser = useSelector(state => state.session.user)

  const [stars, setStars] = useState('')
  const [review, setReview] = useState('')
  const [hasSubmitted, setHasSubmitted] = useState(false)

  const [validationErrors, setValidationErrors] = useState([])

  useEffect(() => {
    const errors = []
    if (stars < 1 || stars > 5) errors.push("Rating must be between 1 and 5")
    if (!review) errors.push("Review is required")

    return setValidationErrors(errors)
  }, [stars, review])


  const handleSubmit = async (e) => {
    e.preventDefault()
    setHasSubmitted(true)

    const payload = {
      spotId: Number(id),
      userId: Number(sessionUser.id),
      stars: Number(stars),
      review
    }

    // if (validationErrors.length === 0) {
      let createReview = await dispatch(createAReview(payload))
      // Added the dispatch below so that the state is updated with all the information needed for the new review
      await dispatch(getAllSpotReviews(id))
      if (createReview) {
        history.push(`/spots/${id}`)
      }
    // }
  }
  return (
    <section>
      <h2>Write a Review</h2>
      {hasSubmitted && validationErrors.length > 0 && (
        <div>
          The following errors were found:
          <ul>
            {validationErrors.map((error) => (
              <li key={error}>{error}</li>
            ))}
          </ul>
        </div>
      )}
      <form onSubmit={handleSubmit}>
        <input
          type="number"
          min="1"
          // max="5"
          placeholder='Your rating between 1 to 5 stars'
          step="1"
          // required
          value={stars}
          onChange={(e) => setStars(e.target.value)}
        />
        <textarea
          id="review"
          onChange={(e) => setReview(e.target.value)}
          value={review}
          placeholder="Write your review here"
        >
        </textarea>
        <button>Submit</button>
      </form>
    </section>
  )
}
export default CreateReviewForm