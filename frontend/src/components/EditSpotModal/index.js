import React, { useState, useEffect } from 'react';
import { Modal } from '../../context/Modal';
import EditSpotForm from './EditSpotForm';
import './EditSpot.css'

function EditSpotModal({spot}) {
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    setShowModal(false)
  }, [spot])

  return (
    <>
      <button onClick={() => setShowModal(true)} className="editButton">Edit listing</button>
      {showModal && (
        <Modal onClose={() => setShowModal(false)}>
          <EditSpotForm spot={spot} />
        </Modal>
      )}
    </>
  );
}

export default EditSpotModal;