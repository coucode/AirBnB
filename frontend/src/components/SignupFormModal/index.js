import React, { useState, useContext, useEffect } from 'react';
import { Modal } from '../../context/Modal';
import SignupForm from "./SignupForm";
import { SwitchModalContext } from "../../context/SwitchModalContext"

import './SignUp.css'

function SignupFormModal() {
  const [showModal, setShowModal] = useState(false)
  const context = useContext(SwitchModalContext)
  const { liContext, setLiContext, setSuContext } = context;

  useEffect(() => {
    if (showModal === true) {
      setSuContext(true)
      setLiContext(false)
    } else {
      setSuContext(null)
      setLiContext(null)
    }
  }, [showModal, setLiContext, setSuContext])

  useEffect(() => {
    if (liContext === true) {
      setShowModal(false)
    }
  }, [liContext])

  return (
    <>
      <button onClick={() => setShowModal(true)} className="signupButton">Sign Up</button>
      {showModal && (
        <Modal onClose={() => setShowModal(false)}>
          <SignupForm setShowModal={setShowModal}/>
        </Modal>
      )}
    </>
  )
}

export default SignupFormModal