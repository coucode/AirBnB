import { NavLink } from 'react-router-dom';

import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { getAllSpots } from '../../store/spots';

import './SplashPage.css';

function SplashPage() {
  const dispatch = useDispatch();
  const allSpots = useSelector(state => state.spots)

  const spotArr = Object.values(allSpots)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    dispatch(getAllSpots())
  }, [dispatch])


  useEffect(() => {
    setLoading(true)
    if (spotArr.length > 0) {
      setLoading(false)
    }
  }, [spotArr])
  

  return (
    <div >
      {!loading || !spotArr ? (
        <>
          {spotArr.map(spot => {
            return (
              <div key={spot.id}>

                <NavLink to={`/spots/${spot.id}`} className='spotCard'>
                  <div>
                    <img src={spot?.previewImage} alt="spot" style={{
                      width: 280.25,
                      height: 266.25
                    }} />
                    <div>
                      <div style={{ fontWeight: 'bold' }}>
                        {spot?.city}, {spot?.state}
                      </div>
                      <div>
                        <i className="fa-solid fa-star"> </i> {spot?.avgRating}
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