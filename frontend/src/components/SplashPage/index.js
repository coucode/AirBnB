import './SplashPage.css';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { getAllSpots } from '../../store/spots';

function SplashPage() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getAllSpots())
  }, [dispatch])
  let spotsObj = useSelector(state => state.spots)
  const spotArr = Object.values(spotsObj)
  
  return (
    <>
      <h1>This is the Splashpage</h1>
      <ul>
        {/* {spotArr.map((spot) => (
          <li key={spot.id}>{spot.name}</li>
        ))} */}
      </ul>
    </>
  )
}

export default SplashPage;