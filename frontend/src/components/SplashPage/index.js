import { NavLink } from 'react-router-dom';

import { useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { getAllSpots } from '../../store/spots';

import './SplashPage.css';

function SplashPage() {
  const dispatch = useDispatch();
  const allSpots = useSelector(state => state.spots)
  let loading = true;
  
  useEffect(() => {
    dispatch(getAllSpots())
  }, [dispatch])
  
  
  let spotArr;
  if (allSpots){
    spotArr = Object.values(allSpots)
    loading = false;
  } else {
    return null
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
    <div className='splashCards'>
      {(loading === false) || (spotArr.length > 0) ? (
        <>
          {spotArr.map(spot => {
            return (
              <div key={spot.id} >

                <NavLink to={`/spots/${spot.id}`} className='spotCard'>
                  <div>
                    <img src={imageCheck(spot)} alt="spot" style={{
                      width: 280.25,
                      height: 266.25
                    }} />
                    <div>
                      <div style={{ fontWeight: 'bold' }}>
                        {spot?.city}, {spot?.state}
                      </div>
                      <div>
                        <i className="fa-solid fa-star"> </i> {ratingCheck(spot)}
                      </div>
                    </div>
                    <div>
                      $<span stlye={{ fontWeight: 'bold' }}>{spot?.price}</span> night
                    </div>
                  </div>
                </NavLink>
              </div>
            )
          })}
        </>
      ) : (
        <>
          Loading...
        </>
      )}

    </div>

  )

}

export default SplashPage;