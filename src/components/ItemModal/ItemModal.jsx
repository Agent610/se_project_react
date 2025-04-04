//import "./Modal.css";
import CloseButton from "../../assets/Close-Button.png";
import CurrentUserContext from "../../contexts/CurrentUserContext";
import selectedCard from "../App/App";
import { useContext } from "react";
import "./ItemModal.css";

function ItemModal({ onClose, card, handleCardDelete, isOpen }) {
  //const currentUser = useContext(CurrentUserContext);
  const userData = useContext(CurrentUserContext);
  const currentUser = userData.user;

  const isOwn = card.owner === currentUser?._id;

  const itemDeleteButtonClassname = `modal__delete ${
    isOwn ? "modal__delete-button_visible" : "modal__delete-button_hidden"
  }`;
  return (
    <div className={`modal ${isOpen ? "modal_opened" : ""}`}>
      <div className="modal__content modal__content_type_image">
        <button onClick={onClose} type="button" className="modal__close">
          <img src={CloseButton} alt="Close-Button" />
        </button>
        <img src={card.imageUrl} alt="image" className="modal__image" />
        <div className="modal__footer">
          <h2 className="modal__caption">{card.name}</h2>
          <p className="modal__weather">Weather: {card.weather}</p>
          {isOwn && (
            <button
              onClick={() => handleCardDelete(card)}
              type="button"
              className={itemDeleteButtonClassname}
            >
              Delete item
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

export default ItemModal;
