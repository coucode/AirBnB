import React, { useState, useEffect } from 'react';
import { Modal } from '../../context/Modal';
import { useSelector } from 'react-redux';
import CreateSpotForm from './CreateSpotForm';
import './CreateSpot.css'

function CreateSpotModal() {
  const [showModal, setShowModal] = useState(false);
  const spots = useSelector(state => state.spots)

  useEffect(() => {
    setShowModal(false)
  }, [spots])

  return (
    <>
      <button onClick={() => setShowModal(true)} className="createSpotButton">Create a new listing</button>
      {showModal && (
        <Modal onClose={() => setShowModal(false)}>
          <CreateSpotForm setShowModal={setShowModal}/>
        </Modal>
      )}
    </>
  );
}

export default CreateSpotModal;