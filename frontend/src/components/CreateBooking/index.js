import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { createABooking, getSpotBookings } from '../../store/bookings';

function CreateBookingForm() {
  const dispatch = useDispatch()
  const sessionUser = useSelector(state => state.session.user)
  let minDate = new Date()

  const [startDate, setStartDate] = useState(minDate.toJSON().split('T')[0])
  const [endDate, setEndDate] = useState('')
  const [hasSubmitted, setHasSubmitted] = useState(false)
  const { id } = useParams()


  const handleSubmit = async (e) => {
    e.preventDefault()
    setHasSubmitted(true)

    console.log("STARTDATE", startDate, "ENDDATE", endDate)

    const payload = {
      startDate, 
      endDate, 
      spotId: id, 
      userId: sessionUser.id
    }

    dispatch(createABooking(payload))
  }


  return (
    <form onSubmit={handleSubmit}>
      <input
        type="date"
        min = {minDate}
        value= {startDate}
        onChange={(e) => setStartDate(e.target.value)}
      >
      </input>
      <input
        type="date"
        value={endDate}
        onChange={(e) => setEndDate(e.target.value)}
      >
      </input>
      <div>
        <button> Submit </button>
      </div>
    </form>
  )
}

export default CreateBookingForm