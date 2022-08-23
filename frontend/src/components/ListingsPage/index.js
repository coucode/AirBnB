import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getOwnerSpots } from '../../store/spots';
import { NavLink } from 'react-router-dom';

function Listings() {
  const dispatch = useDispatch()
  const [loading, setLoading] = useState(true)
  const sessionUser = useSelector(state => state.session.user);
  // const spotError = useSelector(state => state.spots.error)

  useEffect(() => {
    if (sessionUser){
      dispatch(getOwnerSpots())
    }
  }, [dispatch, sessionUser])

  const spotsObj = useSelector(state => state.spots)
  let ownerSpots = Object.values(spotsObj)

  useEffect(() => {
    setLoading(true)
    if (ownerSpots) {
      setLoading(false)
    }
  }, [ownerSpots])

  // function errorMessage() {
  //   if (spotError) {
  //     return (
  //       <h2>You do not have any listings on aircnc</h2>
  //     )
  //   }
  // }

  return (
    <>
      {/* {errorMessage()} */}
      {!loading || !ownerSpots ? (
        <>
          {ownerSpots.map(spot => {
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
        <h2>No listings availble</h2>
      )}
    </>
  )
}

export default Listings;