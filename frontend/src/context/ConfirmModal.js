import React, { useContext, useRef, useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import './Modal.css';

const ConfirmModalContext = React.createContext();

export function ConfirmModalProvider({ children }) {
  const modalRef = useRef();
  const [value, setValue] = useState();

  useEffect(() => {
    setValue(modalRef.current);
  }, [])

  return (
    <>
      <ConfirmModalContext.Provider value={value}>
        {children}
      </ConfirmModalContext.Provider>
      <div ref={modalRef} />
    </>
  );
}

export function ConfirmModal({ onClose, children }) {
  const modalNode = useContext(ConfirmModalContext);
  if (!modalNode) return null;

  return ReactDOM.createPortal(
    <div id="review-modal">
      <div id="review-modal-background" onClick={onClose} />
      <div id="review-modal-content">
        {children}
      </div>
    </div>,
    modalNode
  );
}