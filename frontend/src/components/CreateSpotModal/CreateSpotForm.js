import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { createASpot } from '../../store/spots';

function CreateSpotForm() {
  const dispatch = useDispatch()
  const history = useHistory()
  const [address, setAddress] = useState('');
  const [city, setCity] = useState('');
  const [state, setState] = useState('');
  const [country, setCountry] = useState('');
  const [lat, setLat] = useState('');
  const [lng, setLng] = useState('');
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [image, setImage] = useState('');
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
    if (price < 1) errors.push("Price must be greater than $0")
    if (!image) errors.push("Preview image is required")
    return setValidationErrors(errors)
  }, [address, city, state, country, lat, lng, name, description, price, image])

  const handleSubmit = async (e) => {
    e.preventDefault()
    setHasSubmitted(true)
    if (validationErrors.length > 0) {
      return alert("Cannot Submit");
    }

    const payload = { address, city, state, country, lat, lng, name, description, price, image };
    let newSpot = await dispatch(createASpot(payload))
    if (newSpot) {
      history.push(`/spots/${newSpot.id}`)
    }
  }

  return (
    <section>
      <h2>Create a new listing</h2>
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
          // min="-90.000000000"
          // max="90.000000000"
          // step="0.00000001"
          required
          value={lat}
          onChange={(e) => setLat(e.target.value)} />
        <input
          type="number"
          placeholder="Longitude"
          // min="-180.000000000"
          // max="180.000000000"
          // step="0.00000001"
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
          type="url"
          placeholder="www.example.com"
          required
          value={image}
          onChange={(e) => setImage(e.target.value)} />
        <input
          type="number"
          placeholder="Price"
          // min="0"
          // step="0.01"
          required
          value={price}
          onChange={(e) => setPrice(e.target.value)} />
        <button>Submit</button>
      </form>

    </section>
  )

}

export default CreateSpotForm