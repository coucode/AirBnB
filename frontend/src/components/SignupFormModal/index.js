import React, { useState } from 'react';
import { Modal } from '../../context/Modal';
import SignupForm from "./SignupForm";
import './SignUp.css'

function SignupFormModal() {
  const [showModal, setShowModal] = useState(false)

  return (
    <>
      <button onClick={() => setShowModal(true)} className="signupButton">Sign Up</button>
      {showModal && (
        <Modal onClose={() => setShowModal(false)}>
          <SignupForm />
        </Modal>
      )}
    </>
  )
}

export default SignupFormModal