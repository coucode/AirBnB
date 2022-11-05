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
  const [errors, setErrors] = useState([]);

  const { id } = useParams()

  useEffect(() => {
    if (values.length === 2) {
      let start = new Date(values[0].year, (values[0].month - 1), values[0].day)
      let end = new Date(values[1].year, (values[1].month - 1), values[1].day)

      setStartDate(start)
      setEndDate(end)
    }
  }, [values])

  useEffect(() => {
    setHasSubmitted(false)
    setErrors([])
  },[startDate, endDate])

  const handleSubmit = async (e) => {
    e.preventDefault()
    setHasSubmitted(true)

    const payload = {
      startDate,
      endDate,
      spotId: id,
      userId: sessionUser.id
    }

    dispatch(createABooking(payload)).catch(async (res) => {
      const data = await res.json();
      if (data) {
        let errors = Object.values(data.errors)
        setErrors(errors)
      }
    })
    dispatch(getSpotBookings(id))
  }


  return (
    <div>
      {hasSubmitted && (errors.length >= 1) && (
        <div>
          The following errors were found: 
          {errors?.map((error, idx) => <li key={idx} className="form_errors">{error}</li>)}
        </div>
      )}
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
    </div>
  )
}

export default CreateBookingForm