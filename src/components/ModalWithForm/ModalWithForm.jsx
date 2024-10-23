//import { children } from "react";
import "./ModalWithForm.css";
import CloseButton from "../../assets/Close-Button.png";

function ModalWithForm({ children, buttonText, title, onClose, isOpen }) {
  return (
    <div className={`modal ${isOpen ? "modal_opened" : ""}`}>
      <div className="modal__content modal__content_type_form">
        <h2 className="modal__title">{title}</h2>
        <button onClick={onClose} type="button" className="modal__close">
          <img src={CloseButton} alt="Close-Button" />
        </button>
        <form className="modal__form">
          {children}
          <button type="submit" className="modal__submit">
            {buttonText}
          </button>
        </form>
      </div>
    </div>
  );
}

export default ModalWithForm;
