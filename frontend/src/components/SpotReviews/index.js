import { useEffect } from 'react';
import { useDispatch } from 'react-redux'
import { useParams } from 'react-router-dom';
import { getAllSpotReviews } from '../../store/reviews';

function SpotReviews() {
  const dispatch = useDispatch()
  const { id } = useParams()

  useEffect(() => {
    dispatch(getAllSpotReviews(id))
  }, [dispatch, id])

}

export default SpotReviews;