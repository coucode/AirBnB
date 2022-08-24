import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { updateASpot } from '../../store/spots';

function EditSpotForm({ spot }) {
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

  useEffect(() => {
    const errors = [];
    if (!address) errors.push("Address is required")
    if (!city) errors.push("City is required")
    if (!state) errors.push("State is required")
    if (!country) errors.push("Country is required")
    if (!name) errors.push("Name is required")
    if (name.length > 50) errors.push("Name must be less than 50 characters")
    if (!description) errors.push("Description is required")
    if (lat < -90 || lat > 90) errors.push("Latitude must be between -90 and 90")
    if (lng < -180 || lng > 180) errors.push("Longitude must be between -180 and 180")
    if (!price) errors.push("Price per day is required")
    if (!sessionUser.id) errors.push("Must be logged in to create a new listing")
    return setValidationErrors(errors)
  }, [address, city, state, country, lat, lng, name, description, price, sessionUser])


  const handleSubmit = async (e) => {
    e.preventDefault()
    setHasSubmitted(true)
    if (validationErrors.length > 0) {
      return alert("Cannot Submit");
    }

    const payload = { id: spot.id, address, city, state, country, lat, lng, name, description, price };

    let updatedSpot = await dispatch(updateASpot(payload))
    if (updatedSpot) {
      history.push(`/listings`)
    }
  }

  return (
    <section>
      <h2>Edit your listing</h2>
      {hasSubmitted && validationErrors.length > 0 && (
        <div>
          The following errors were found:
          <ul>
            {validationErrors.map((error) => (
              <li key={error}>{error}</li>
            ))}
          </ul>
        </div>
      )}
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Address"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
        />
        <input
          type="text"
          placeholder="City"
          value={city}
          onChange={(e) => setCity(e.target.value)}
        />
        <input
          type="text"
          placeholder="State"
          value={state}
          onChange={(e) => setState(e.target.value)}
        />
        <input
          type="text"
          placeholder="Country"
          value={country}
          onChange={(e) => setCountry(e.target.value)}
        />
        <input
          type="number"
          placeholder="Latitude"
          min="-90"
          max="90"
          required
          value={lat}
          onChange={(e) => setLat(e.target.value)} />
        <input
          type="number"
          placeholder="Longitude"
          min="-180"
          max="180"
          required
          value={lng}
          onChange={(e) => setLng(e.target.value)} />
        <input
          type="text"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <textarea
          id="description"
          onChange={(e) => setDescription(e.target.value)}
          value={description}
          placeholder="Write a description about your listing here."
        ></textarea>
        <input
          type="number"
          placeholder="Price"
          min="0"
          required
          value={price}
          onChange={(e) => setPrice(e.target.value)} />
        <button>Submit</button>
      </form>

    </section>
  )

}

export default EditSpotForm