import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, useHistory } from 'react-router-dom';
import { deleteASpot, getOneSpot, getOwnerSpots } from '../../store/spots';
import EditSpotModal from '../EditSpotModal'
import SpotReviews from '../SpotReviews';
import './SpotDetail.css'

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
        if (data) {
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
        <div className='sd_modify_buttons'>
          <EditSpotModal spot={spot} />
          <button onClick={handleDeleteClick} className="deleteButton">Delete Listing</button>
        </div>
      )
    }
  }

  return (
    <div className='sd_container'>
      {!loading || !spot ? (
        <>
          <div className='sd_header'>
            <h1> {spot?.name} </h1>
            {modifyButtons}
          </div>
          <div className='sd_subtitle'>
            <div className='sd_subtitle_star'>
              <i className="fa-solid fa-star"> </i>
            </div>
            <div>
              {ratingCheck(spot)} ·
            </div>
            <div className='sd_subtitle_num_reviews'>
              {spot?.numReviews} Reviews ·
            </div>
            <div className='sd_subtitle_location'>{spot?.city}, {spot?.state}, {spot?.country}</div>
          </div>
          <div className='sd_img_container'>
            <img src={imageCheck(spot)} alt="spot" className='sd_img'></img>
          </div>
          <div className='sd_info_container'>
            <div className='sd_info_container_left'>
              <div className="sd_owner_container">
                <p className='sd_owner_info'>Entire home hosted by {spot?.Owner.firstName} {spot?.Owner.lastName}</p>
                <img className="owner-prof" src="https://www.seekpng.com/png/full/73-730482_existing-user-default-avatar.png" alt="owner"></img>
              </div>
              <div className='sd_description'>
                <p>{spot?.description}</p>
              </div>
              <div className='sd_reviews'>
                <div className='sd_reviews_header'>
                  <div className='sd_subtitle_star'>
                    <i className="fa-solid fa-star"> </i>
                  </div>
                  <div>
                    {ratingCheck(spot)} ·
                  </div>

                  <div className='sd_subtitle_num_reviews'>{spot?.numReviews} Reviews</div>

                </div>
                <SpotReviews spot={spot} />

              </div>
            </div>
            <div className='sd_info_container_right'>
              <div className='sd_info_price'>
                <div className='sd_info_pricenight'>
                  <p className='sd_info_price--boldtext'>${spot?.price}</p>
                  <p className='sd_info_night'>  night</p>
                </div>
                <div className='sd_info_reviews'>
                  <div className='sd_subtitle_star'>
                    <i className="fa-solid fa-star"> </i>
                  </div>
                  <div>
                    {ratingCheck(spot)} ·

                  </div>
                  <div className='sd_subtitle_num_reviews'>{spot?.numReviews} Reviews</div>
                </div>
              </div>
            </div>


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