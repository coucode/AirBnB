import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { getOneSpot, updateASpot } from '../../store/spots';

function EditSpotForm({ spot, setShowModal }) {
  const dispatch = useDispatch()
  const history = useHistory()
  const sessionUser = useSelector(state => state.session.user)
  const [address, setAddress] = useState(spot.address || '');
  const [city, setCity] = useState(spot.city || '');
  const [state, setState] = useState(spot.state || '');
  const [country, setCountry] = useState(spot.country || '');
  const [lat, setLat] = useState(spot.lat || '');
  const [lng, setLng] = useState(spot.lng || '');
  const [name, setName] = useState(spot.name || '');
  const [description, setDescription] = useState(spot.description || '');
  const [price, setPrice] = useState(spot.price || '');
  const [validationErrors, setValidationErrors] = useState([]);
  const [hasSubmitted, setHasSubmitted] = useState(false)
  const [buttonChange, setButtonChange] = useState('edit_button')


  useEffect(() => {
    if (address.length > 0 && city.length > 0
      && state.length > 0 && country.length > 0
      && name.length > 0 && description.length > 0
      && lat.length > 0 && lng.length > 0
      && price.length > 0 ) {
      setButtonChange('edit_button')
    }
    if (address.length === 0 || city.length === 0 ||
      state.length === 0 || country.length === 0 ||
      name.length === 0 || description.length === 0 ||
      lat.length === 0 || lng.length === 0 ||
      price.length === 0 ) {
      setButtonChange('csl-submit-button-disabled')
    }
  }, [address, city, state, country, lat, lng, name, description, price])

  useEffect(() => {
    const errors = [];
    if (!address) errors.push("Address is required")
    if (!city) errors.push("City is required")
    if (!state) errors.push("State is required")
    if (!country) errors.push("Country is required")
    if (!name) errors.push("Name is required")
    if (name.length > 50) errors.push("Name must be less than 50 characters")
    if (!description) errors.push("Description is required")
    if (!lat) errors.push("Latitude between -90 and 90 is required")
    if (!lng) errors.push("Longitude between -90 and 90 is required")
    if (lat < -90 || lat > 90) errors.push("Latitude must be between -90 and 90")
    if (lng < -180 || lng > 180) errors.push("Longitude must be between -180 and 180")
    if (!price) errors.push("Price per day is required")
    if (!sessionUser.id) errors.push("Must be logged in to create a new listing")
    return setValidationErrors(errors)
  }, [address, city, state, country, lat, lng, name, description, price, sessionUser])


  const handleSubmit = async (e) => {
    e.preventDefault()
    setHasSubmitted(true)

    const payload = { id: spot.id, address, city, state, country, lat, lng, name, description, price };

    await dispatch(updateASpot(payload))
    await dispatch(getOneSpot(spot.id))
    await history.push(`/spots/${spot.id}`)
  }

  return (
    <section className='edit_container'>
      <div className='cr_title_container'>
        <h2 className='modal_title'>Edit your listing</h2>
        <div>
          <i
            className="fa-solid fa-xmark fa-lg"
            onClick={() => setShowModal(false)}
          ></i>
        </div>
      </div>

      {hasSubmitted && validationErrors.length >= 1 && (
        <div className='form_errors_container'>
          The following errors were found:
          <ul className="form_errors">
            {validationErrors.map((error) => (
              <li key={error} className="form_errors">{error}</li>
            ))}
          </ul>
        </div>
      )}
      <form onSubmit={handleSubmit} className="edit_form">
        <input
          className='edit_inputs_top'
          type="text"
          placeholder="Address"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
        />
        <div>
          <input
            className="edit_inputs_middle"
            type="text"
            id="city"
            placeholder="City"
            value={city}
            onChange={(e) => setCity(e.target.value)}
          />
          <input
            className="edit_inputs_middle"
            type="text"
            id="state"
            placeholder="State"
            value={state}
            onChange={(e) => setState(e.target.value)}
          />

        </div>
        <input
          className="edit_inputs_middle"
          type="text"
          placeholder="Country"
          value={country}
          onChange={(e) => setCountry(e.target.value)}
        />
        <div>
          <input
            className="edit_inputs_latlng"
            type="number"
            placeholder="Latitude"
            value={lat}
            onChange={(e) => setLat(e.target.value)} />
          <input
            className="edit_inputs_latlng"
            type="number"
            placeholder="Longitude"
            value={lng}
            onChange={(e) => setLng(e.target.value)} />
        </div>
        <input
          className="edit_inputs_middle"
          type="text"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <textarea
          className="edit_inputs_middle"
          id="description"
          onChange={(e) => setDescription(e.target.value)}
          value={description}
          placeholder="Write a description about your listing here."
        ></textarea>
        <input
          className='edit_inputs_bottom'
          type="number"
          placeholder="Price"
          min="0"
          step="1"
          // required
          value={price}
          onChange={(e) => setPrice(e.target.value)} />
        <div className='edit_button_container'>
          <button className={`${buttonChange}`} disabled={buttonChange === 'csl-submit-button-disabled' ? true : false}>Submit</button>
        </div>
      </form>
    </section>
  )

}

export default EditSpotForm