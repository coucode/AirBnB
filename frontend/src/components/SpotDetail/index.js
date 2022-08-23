import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { getOneSpot } from '../../store/spots';

function SpotDetail(){
  const dispatch = useDispatch()
  const { id } = useParams()
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    dispatch(getOneSpot(id))
  }, [dispatch, id])

  const spotsObj = useSelector(state => state.spots)
  const spot = spotsObj[id].detail

  useEffect(() => {
    setLoading(true)
    if (spot) {
      setLoading(false)
    }
  }, [spot])

  return (
    <div> 
      {!loading || !spot ? (
        <>
          <h1> {spot?.name} </h1>
          <div>
            <i className="fa-solid fa-star"> </i> {spot?.avgStarRating}
            <div>{spot?.numReviews} Reviews</div>
            <div>{spot?.city}, {spot?.state}, {spot?.country}</div> 
          </div>
          <img src={spot?.Images[0].url} alt="spot" style={{height: 500, width: 500}}></img>
          <div>
            <p>Entire home hosted by {spot?.Owner.firstName} {spot?.Owner.lastName}</p>
            <p>{spot?.name}</p>
            <p style={{fontWeight: 'bold'}}> The Space </p>
            <p>{spot?.description}</p>
          </div>
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