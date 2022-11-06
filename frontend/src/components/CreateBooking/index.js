import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { createABooking, getSpotBookings } from '../../store/bookings';
import { Calendar } from "react-multi-date-picker"
import './CreateBooking.css'
import Footer from "react-multi-date-picker/plugins/range_picker_footer";

function CreateBookingForm() {
  const [values, setValues] = useState([])
  const dispatch = useDispatch()
  const sessionUser = useSelector(state => state.session.user)

  const [startDate, setStartDate] = useState('')
  const [endDate, setEndDate] = useState('')
  const [hasSubmitted, setHasSubmitted] = useState(false)
  const [errors, setErrors] = useState([]);
  const [success, setSuccess] = useState('')

  const { id } = useParams()
  let loading = true;


  useEffect(() => {
    dispatch(getSpotBookings(id))
  }, [dispatch, id])

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
  }, [startDate, endDate])

  // Obtains the bookings from state, creates an array with that information
  let bookings;
  const bookingsObj = useSelector(state => state.bookings)
  if (bookingsObj) {
    bookings = Object.values(bookingsObj)
    loading = false;
  }

  // Rerenders the component while state is loading
  if (!bookingsObj) return null
  if (!bookings) return null

  // Sorts the bookings into future arrays so they can be displayed separately. 
  // Created a variable for today's date, and change the string values to date values in order to compare
  let currentDate = new Date()
  let futureBookings = []
  if (bookings) {
    bookings.forEach(booking => {
      let convertDate = new Date(booking.startDate)

      if (convertDate >= currentDate) {
        let start = new Date(booking.startDate)
        let end = new Date(booking.endDate)

        while (start <= end) {
          futureBookings.push(new Date(start).toDateString())
          start.setDate(start.getDate() + 1);
        }
      }
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setHasSubmitted(true)

    const payload = {
      startDate,
      endDate,
      spotId: id,
      userId: sessionUser.id
    }

    dispatch(createABooking(payload)).then(() => {
      setSuccess('Booking Successful!')
      setErrors('')
      setTimeout(() => setSuccess(''), 5000)
      dispatch(getSpotBookings(id))
    }).catch(async (res) => {
      const data = await res.json();
      if (data) {
        let errors = Object.values(data.errors)
        setErrors(errors)
      }

    })
  }
  let dateChecker = new Date()

  return (
    <div>
      {hasSubmitted && (errors.length >= 1) && (
        <div className='booking-error-container'>
          <p>
            The following errors were found:
          </p>
          {errors?.map((error, idx) => <li key={idx} className="form_errors">{error}</li>)}
        </div>
      )}
      {hasSubmitted && success.length > 0 && (
        <p className='success-text'>
          Booking Successful!
        </p>
      )}
      {!loading ? (
        <div>
          <form onSubmit={handleSubmit}>
            < Calendar
              mapDays={({ date }) => {
                let dayCheck = new Date(date.year, (date.month - 1), date.day)

                if (futureBookings.includes(dayCheck.toDateString()) || dayCheck < dateChecker) return {
                  disabled: true,
                  style: { color: "#ccc" },
                  // onMouseOver: () => ("No")
                }
              }}
              value={values}
              onChange={setValues}
              numberOfMonths={1}
              range
              // rangeHover
              className="custom-input custom-calendar aircnc-theme"
              plugins={[
                <Footer
                  position="bottom"
                  format="MMM DD"
                  names={{
                    selectedDates: "Booking Information:",
                    from: "Check-In:",
                    to: "Check-Out:",
                    selectDate: "Select a Date",
                    close: "Close",
                    separator: <br />
                  }}
                />,
              ]}
              style={{ fontFamily: "'Montserrat', sans-serif" }}
            />
            <div >
              <button className='create-booking'> Book </button>
            </div>
          </form>
        </div>

      ) : (<div> Loading... </div>)}


    </div>
  )
}

export default CreateBookingForm