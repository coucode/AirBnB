import React, { useState, useEffect } from 'react';
import { Modal } from '../../context/Modal';
import { useSelector } from 'react-redux';
import CreateSpotForm from './CreateSpotForm';

function CreateSpotModal() {
  const [showModal, setShowModal] = useState(false);
  const spots = useSelector(state => state.spots)

  useEffect(() => {
    setShowModal(false)
  }, [spots])

  return (
    <>
      <button onClick={() => setShowModal(true)}>Create a new listing</button>
      {showModal && (
        <Modal onClose={() => setShowModal(false)}>
          <CreateSpotForm />
        </Modal>
      )}
    </>
  );
}

export default CreateSpotModal;