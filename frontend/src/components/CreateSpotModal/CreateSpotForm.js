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
    if (!lat) errors.push("Latitude between -90 and 90 is required")
    if (!lng) errors.push("Longitude between -90 and 90 is required")
    if (lat < -90 || lat > 90) errors.push("Latitude must be between -90 and 90")
    if (lng < -180 || lng > 180) errors.push("Longitude must be between -180 and 180")
    if (!price) errors.push("Price per day is required")
    if (price < 1) errors.push("Price must be greater than $0")
    if (!image) errors.push("Preview image is required")
    // Refactor this after presentation
    let validation = false;
    if (image.includes("png") || image.includes("jpg") || image.includes("jpeg")) {
      validation = true;
    }
    if (validation === false) {
      errors.push("Valid preview image url is required. Please provide an png, jpg, or jpeg image url")
    }
    return setValidationErrors(errors)
  }, [address, city, state, country, lat, lng, name, description, price, image])

  const handleSubmit = async (e) => {
    e.preventDefault()
    setHasSubmitted(true)

    const payload = { address, city, state, country, lat, lng, name, description, price, image };
    if (validationErrors.length === 0) {
      let newSpot = await dispatch(createASpot(payload))
      if (newSpot) {
        history.push(`/spots/${newSpot.id}`)
      }
    }
  }

  return (
    <section className='csl_container'>
      <h2 className='modal_title'>Create a new listing</h2>
      {hasSubmitted && validationErrors.length > 0 && (
        <div className='form_errors_container'>
          The following errors were found:
          <ul className="form_errors">
            {validationErrors.map((error) => (
              <li key={error} className="form_errors">{error}</li>
            ))}
          </ul>
        </div>
      )}
      <form onSubmit={handleSubmit} className="csl_form">
        <input className='csl_inputs_top'
          type="text"
          placeholder="Address"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
        // required

        />
        <input
          className="csl_inputs_middle"
          type="text"
          placeholder="City"
          value={city}
          onChange={(e) => setCity(e.target.value)}
        // required

        />
        <input
          className="csl_inputs_middle"
          type="text"
          placeholder="State"
          value={state}
          onChange={(e) => setState(e.target.value)}
        // required

        />
        <input
          className="csl_inputs_middle"
          type="text"
          placeholder="Country"
          value={country}
          onChange={(e) => setCountry(e.target.value)}
        // required

        />
        <input
          className="csl_inputs_middle"
          type="number"
          placeholder="Latitude"
          // min="-90.000000000"
          // max="90.000000000"
          // step="0.00000001"
          // required
          value={lat}
          onChange={(e) => setLat(e.target.value)} />
        <input
          className="csl_inputs_middle"
          type="number"
          placeholder="Longitude"
          // min="-180.000000000"
          // max="180.000000000"
          // step="0.00000001"
          // required
          value={lng}
          onChange={(e) => setLng(e.target.value)} />
        <input
          className="csl_inputs_middle"
          type="text"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        // required

        />
        <textarea
          className="csl_inputs_middle"
          id="description"
          onChange={(e) => setDescription(e.target.value)}
          value={description}
          placeholder="Write a description about your listing here."
        // required

        ></textarea>
        <input
          className="csl_inputs_middle"
          type="url"
          placeholder="Provide a link to your png/jpg/jpeg preview image."
          // required
          value={image}
          onChange={(e) => setImage(e.target.value)} />
        <input
          className='csl_inputs_bottom'
          type="number"
          placeholder="Price"
          min="0"
          step="1"
          // required
          value={price}
          onChange={(e) => setPrice(e.target.value)} />
        <div className='csl_button_container'>
          <button className='csl_button'> Submit </button>
        </div>
      </form>
    </section>
  )
}
export default CreateSpotForm