import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getOwnerSpots } from '../../store/spots';
import { NavLink } from 'react-router-dom';
import './ListingsPage.css'

function Listings() {
  const dispatch = useDispatch()
  const sessionUser = useSelector(state => state.session.user);

  useEffect(() => {
    if (sessionUser){
      dispatch(getOwnerSpots())
    } 
  }, [dispatch, sessionUser])

  let loading = true;
  const spotsObj = useSelector(state => state.spots)
  let spots;
  if (spotsObj !== {}){
    spots = Object.values(spotsObj)
    loading = false;
  } else {
    return (
      <h2 className='noDataListings'>No listings available</h2>
    )
  }
  if (!sessionUser || spots.length === 0) {
    return (
      <>
      <h2 className='noDataListings'>No listings available</h2>
      </>
    )
  }

  function imageCheck(spot) {
    if (spot.previewImage) {
      return spot.previewImage
    } else {
      return "https://st.depositphotos.com/1987177/3470/v/450/depositphotos_34700099-stock-illustration-no-photo-available-or-missing.jpg"
    }
  }

  function ratingCheck(spot) {
    if (spot.avgRating) {
      return spot.avgRating
    } else {
      return "New"
    }
  }

  return (
    <div className='l_outer_container'> 


    <div className='l_container'>
      {(loading === false) && (spots.length > 0) ? (
        <>
          {spots.map(spot => {
            return (
              <div key={spot.id}>
                <NavLink to={`/spots/${spot.id}`} className='l_container_cards'>
                  <div>
                    <img
                      src={imageCheck(spot)}
                      alt="listing"
                      style={{ width: 280.25, height: 266.25 }}
                      className="l_container_cards_img"
                      onError={e => { e.currentTarget.src = "https://letusstudy.in/clientside/images/no-image.png" }}
                    />
                    <div className="l_container_cards_top">
                      <div className='l_container_cards_top--text'>
                        {spot?.city}, {spot?.state}
                      </div>
                      <div>
                        <i className="fa-solid fa-star"> </i> {ratingCheck(spot)}
                      </div>
                    </div>
                    <div className="l_container_cards_bottom">
                      <p style={{ fontWeight: 'bold' }}>${spot?.price} </p> <p style={{ color: "#383838", paddingLeft: '5px' }}> night</p>
                    </div>
                  </div>
                </NavLink>
              </div>
            )
          })}
        </>
      ) : (
          <h2 className='noData'>Loading...</h2>
      )}
    </div>
    </div>
  )
}

export default Listings;