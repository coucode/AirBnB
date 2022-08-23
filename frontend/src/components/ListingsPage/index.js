import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getOwnerSpots } from '../../store/spots';
import { NavLink } from 'react-router-dom';

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
  if (spotsObj){
    spots = Object.values(spotsObj)
    loading = false;
  } else {
    return (
      <h2>No listings available</h2>
    )
  }
  if (!sessionUser) {
    return (
      <h2>No listings available</h2>
    )
  }

  return (
    <div className='splashCards'>
      {(loading === false) && (spots.length > 0) ? (
        <>
          {spots.map(spot => {
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
        <h2>Loading...</h2>
      )}
    </div>
  )
}

export default Listings;