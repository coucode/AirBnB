import React, { useState } from 'react';
import { ConfirmModal } from '../../context/ConfirmModal';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';

import { deleteABooking } from '../../store/bookings';
import { deleteASpot, getOwnerSpots } from '../../store/spots';

import './DeleteModal.css';


function ConfirmDelete({ type, input }) {
  const [showModal, setShowModal] = useState(false);
  const dispatch = useDispatch();
  const history = useHistory()

  const handleSpotDeleteClick = async (e) => {
    await dispatch(deleteASpot(input.id))
    await dispatch(getOwnerSpots())
    await history.push('/listings')
  }

  function deleteModal(type) {
    if (type === 'booking') {
      return (
        <button onClick={(e) => {
          dispatch(deleteABooking(input.id))
        }} className='delete-booking-button'>Delete Booking</button>
      )
    }
    if (type === 'listing'){
      return (
        <button onClick={handleSpotDeleteClick} className="deleteButton">Delete Listing</button>
      )
    }
  }

  return (
    <>
      <button onClick={() => setShowModal(true)} className='delete-modal-button'>Delete {type[0].toUpperCase() + type.substring(1)}</button>
      {showModal && (
        <ConfirmModal onClose={() => setShowModal(false)}>
          <div className='delete-modal-container'>
            <div className='delete-text-container'>
              <p>
                Are you sure you want to delete this {type}?
              </p>
              <div>
                <i
                  className="fa-solid fa-xmark fa-lg"
                  onClick={() => setShowModal(false)}
                ></i>
              </div>
            </div>
            <div className='delete-buttons-container'>
              {deleteModal(type)}
              <button onClick={(e) => { setShowModal(false) }} className='cancel-button'>
                Cancel
              </button>
            </div>
          </div>
        </ConfirmModal>
      )}
    </>
  )


}

export default ConfirmDelete;