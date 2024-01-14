import React, { useEffect, useRef } from 'react';
import  '../css/Modal.css'; // Import your modal CSS

interface ModalProps {
  onClose: () => void;
  children: React.ReactNode;
  showModal: boolean;
}

const Modal: React.FC<ModalProps> = ({onClose, children, showModal }) => {
  const dialogRef = useRef(null);


  useEffect(() => {
    const handleClickOutside = (event: { target: any; }) => {
      debugger;
      if (dialogRef.current && !dialogRef.current.contains(event.target)) {
        onClose();
      }
    };

    if (showModal) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [showModal, onClose]);

  if (!showModal) return null;


  return (
    <dialog id="my_modal_1" className="modal"  open={true} >
        <div className="modal-box"  ref={dialogRef}>
        {children}
        </div>
    </dialog>

  );
};

export default Modal;
