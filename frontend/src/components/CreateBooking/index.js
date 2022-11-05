import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { createABooking, getSpotBookings } from '../../store/bookings';
import { Calendar } from "react-multi-date-picker"

function CreateBookingForm() {
  const [values, setValues] = useState([
    new Date()
  ])
  const dispatch = useDispatch()
  const sessionUser = useSelector(state => state.session.user)

  const [startDate, setStartDate] = useState('')
  const [endDate, setEndDate] = useState('')
  const [hasSubmitted, setHasSubmitted] = useState(false)
  const { id } = useParams()

  useEffect(() => {
    if (values.length === 2) {
      let start = new Date(values[0].year, values[0].month, values[0].day) 
      let end = new Date(values[1].year, values[1].month, values[1].day) 

      setStartDate(start)
      setEndDate(end)
    }
  }, [values])

  console.log("VALUES========", values)
  console.log("VALUES 1========", values[0])
  console.log("VALUES 2========", values[1])

  console.log("START======", startDate)
  console.log("END=========", endDate)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setHasSubmitted(true)

    const payload = {
      startDate,
      endDate,
      spotId: id,
      userId: sessionUser.id
    }

    dispatch(createABooking(payload))
    dispatch(getSpotBookings(id))
  }


  return (
    <form onSubmit={handleSubmit}>
      < Calendar
        value={values}
        onChange={setValues}
        range
        rangeHover
      />
      <div>
        <button> Submit </button>
      </div>
    </form>
  )
}

export default CreateBookingForm