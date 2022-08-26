import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, useHistory } from 'react-router-dom';
import { deleteASpot, getOneSpot, getOwnerSpots } from '../../store/spots';
import EditSpotModal from '../EditSpotModal'
import SpotReviews from '../SpotReviews';

function SpotDetail() {
  const dispatch = useDispatch()
  const history = useHistory()
  const { id } = useParams()
  const [loading, setLoading] = useState(true)
  const sessionUser = useSelector(state => state.session.user)
  const spotObj = useSelector(state => state.spots)
  const spot = spotObj[id]
  const reviews = useSelector(state => state.reviews)

  useEffect(() => {
    dispatch(getOneSpot(id)).catch(
      async (res) => {
        const data = await res.json()
        if (data){
          history.push("/")
        }
      }
    )
  }, [dispatch, id, reviews, history])

  useEffect(() => {
    setLoading(true)
    if (spot) {
      setLoading(false)
    }
  }, [spot])

  if (!spot) return null
  if (!spot.Images) return null
  function imageCheck(spot) {
    if (spot.Images.length > 0) {
      return spot.Images[0].url
    } else {
      return "https://st.depositphotos.com/1987177/3470/v/450/depositphotos_34700099-stock-illustration-no-photo-available-or-missing.jpg"
    }
  }

  function ratingCheck(spot) {
    if (spot.avgStarRating) {
      return spot.avgStarRating
    } else {
      return "New"
    }
  }

  const handleDeleteClick = async (e) => {
    await dispatch(deleteASpot(id))
    await dispatch(getOwnerSpots())
    await history.push('/listings')
  }

  let modifyButtons;
  if (spot && sessionUser) {
    if (spot.ownerId === sessionUser.id) {
      modifyButtons = (
        <>
          <EditSpotModal spot={spot} />
          <button onClick={handleDeleteClick}>Delete Listing</button>
        </>
      )
    }
  }

  return (
    <div>
      {!loading || !spot ? (
        <>
          <h1> {spot?.name} </h1>
          {modifyButtons}
          <div>
            <i className="fa-solid fa-star"> </i> {ratingCheck(spot)}
            <div>{spot?.numReviews} Reviews</div>
            <div>{spot?.city}, {spot?.state}, {spot?.country}</div>
          </div>
          <img src={imageCheck(spot)} alt="spot" style={{ height: 500, width: 500 }}></img>
          <div>
            <p>Entire home hosted by {spot?.Owner.firstName} {spot?.Owner.lastName}</p>
            <p>{spot?.name}</p>
            <p style={{ fontWeight: 'bold' }}> The Space </p>
            <p>{spot?.description}</p>
          </div>
          <SpotReviews />
          <div>
          </div>
        </>
      ) : (
        <>
          <h1>loading...</h1>
        </>
      )}
    </div>
  )
}


export default SpotDetail