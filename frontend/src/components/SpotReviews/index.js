import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom';
import { getAllSpotReviews } from '../../store/reviews';

function SpotReviews() {
  const dispatch = useDispatch()
  const { id } = useParams()
  const reviewsObj = useSelector(state => state.reviews)
  // console.log("REVIEWSOBJ",reviewsObj)
  const reviews = Object.values(reviewsObj)
  console.log("REVIEWSARR", reviews)

  useEffect(() => {
    dispatch(getAllSpotReviews(id))
  }, [dispatch, id])

  if (!reviews) return null

  function dateConverter(review){
    if (review){
      let date = new Date(review.createdAt)
      const options = { month: 'long', year:'numeric' }
      date = date.toLocaleDateString(undefined, options)
      return date
    }
  }

  return (
    <div>
      {reviews.length > 0 ? (
        <>
          {reviews.map(review => {
            return (
              <div key={review.id}>
                <p>{review.User.firstName}</p>
                <p>{dateConverter(review)}</p>
                <p>{review.review}</p>
              </div>
            )
          })}
        </>

      ) : (<h3>Loading...</h3>)}

    </div>
  )

}

export default SpotReviews;