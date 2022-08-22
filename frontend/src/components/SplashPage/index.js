import { NavLink } from 'react-router-dom';
import { useState, useEffect } from 'react';
import './SplashPage.css';

function SplashPage({ spots }) {
  const spotArr = Object.values(spots)
  const [loading, setLoading] = useState(true)

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