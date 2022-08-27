import React, { useState, useEffect } from 'react';
import { Modal } from '../../context/Modal';
import { useSelector } from 'react-redux';
import CreateReviewForm from './CreateReviewForm';
import './CreateReview.css'

function CreateReviewModal() {
  const [showModal, setShowModal] = useState(false);
  const reviews = useSelector(state => state.reviews)

  useEffect(() => {
    setShowModal(false)
  }, [reviews])

  return (
    <>
      <button onClick={() => setShowModal(true)} className="create_review_button">Write a Review</button>
      {showModal && (
        <Modal onClose={() => setShowModal(false)}>
          <CreateReviewForm />
        </Modal>
      )}
    </>
  );
}

export default CreateReviewModal;