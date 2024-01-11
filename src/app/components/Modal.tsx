import React, { useRef } from 'react';
import  '../css/Modal.css'; // Import your modal CSS

interface ModalProps {
  onClose: () => void;
  children: React.ReactNode;
  showModal: boolean;
}

const Modal: React.FC<ModalProps> = ({onClose, children, showModal }) => {
  const dialogRef = useRef(null);

  if (!showModal) {
    return null;
  }
  return (
    <dialog id="my_modal_1" className="modal"  open={true}>
        <div className="modal-box">
        {children}
        </div>
    </dialog>

  );
};

export default Modal;
