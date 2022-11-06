import React, { useState, useEffect } from 'react';
import { ReviewModal } from '../../context/ReviewModal';
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
        <ReviewModal onClose={() => setShowModal(false)}>
          <CreateReviewForm setShowModal={setShowModal}/>
        </ReviewModal>
      )}
    </>
  );
}

export default CreateReviewModal;