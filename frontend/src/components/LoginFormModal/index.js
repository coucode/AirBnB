import React, { useState, useContext, useEffect } from 'react';
import { Modal } from '../../context/Modal';
import LoginForm from './LoginForm';
import './LoginForm.css'
import { SwitchModalContext } from "../../context/SwitchModalContext"


function LoginFormModal() {
  const [showModal, setShowModal] = useState(false);
  const context = useContext(SwitchModalContext)
  const { setLiContext, suContext, setSuContext } = context;

  useEffect(() => {
    if (showModal === true) {
      setSuContext(false)
      setLiContext(true)
    } else {
      setSuContext(null)
      setLiContext(null)
    }
  }, [showModal, setLiContext, setSuContext])

  useEffect(() => {
    if (suContext === true) {
      setShowModal(false)
    }
  }, [suContext])

  return (
    <>
      <button onClick={() => setShowModal(true)} className="loginButton">Log In</button>
      {showModal && (
        <Modal onClose={() => setShowModal(false)}>
          <LoginForm setShowModal={setShowModal}/>
        </Modal>
      )}
    </>
  );
}

export default LoginFormModal;