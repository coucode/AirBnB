import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useParams } from 'react-router-dom';
import { createAReview, getAllSpotReviews } from '../../store/reviews';

function CreateReviewForm({ setShowModal }) {
  const { id } = useParams()
  const dispatch = useDispatch()
  const history = useHistory()
  const sessionUser = useSelector(state => state.session.user)

  const [stars, setStars] = useState('')
  const [review, setReview] = useState('')
  const [hasSubmitted, setHasSubmitted] = useState(false)
  const [validationErrors, setValidationErrors] = useState([])
  const [buttonChange, setButtonChange] = useState('cr-submit-button-disabled')


  useEffect(() => {
    if (stars.length > 0 && review.length > 0) {
      setButtonChange('cr_button')
    }
    if (stars.length === 0 || review.length === 0) {
      setButtonChange('cr-submit-button-disabled')
    }
  }, [stars, review])

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
    <div className='cr_container'>
      <div className='cr_title_container'>
        <h2 className='modal_title'>Write a Review</h2>
        <div>
          <i
            className="fa-solid fa-xmark fa-lg"
            onClick={() => setShowModal(false)}
          ></i>
        </div>
      </div>

      { hasSubmitted && validationErrors.length > 0 && (
        <div className='form_errors_container'>
          The following errors were found:
          <ul className="form_errors">
            {validationErrors.map((error) => (
              <li key={error} className="form_errors">{error}</li>
            ))}
          </ul>
        </div>
      )}
      <form onSubmit={handleSubmit} className='cr_form'>
        <input
          className='cr_inputs_top'
          type="number"
          min="1"
          placeholder='Your rating between 1 to 5 stars'
          step="1"
          // required
          value={stars}
          onChange={(e) => setStars(e.target.value)}
        />
        <textarea
          className='cr_inputs_bottom'
          id="review"
          onChange={(e) => setReview(e.target.value)}
          value={review}
          placeholder="Write your review here"
        >
        </textarea>
        <div className='cr_button_container'>
          <button className={`${buttonChange}`} disabled={buttonChange === 'cr-submit-button-disabled' ? true : false}>Submit</button>
        </div>
      </form>
    </div>
  )
}
export default CreateReviewForm