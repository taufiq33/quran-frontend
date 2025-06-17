import { useEffect, useRef } from "react";
import { createPortal } from "react-dom";

export default function ModalDialog({
  children,
  open,
  onClose,
  autoClose = false,
}) {
  const modalRef = useRef();

  useEffect(() => {
    const modalElement = modalRef.current;
    open && modalElement.showModal();
    let timeout = null;

    if (autoClose) {
      timeout = setTimeout(() => {
        onClose();
      }, 1500);
    }

    return () => {
      clearTimeout(timeout);
      modalElement?.close();
    };
  }, [open, autoClose, onClose]);

  return createPortal(
    <dialog
      onClose={onClose}
      className="modal rounded-xl p-4 fixed top-1/8 mx-auto shadow-2xl"
      ref={modalRef}
    >
      {children}
    </dialog>,
    document.getElementById("modal")
  );
}
