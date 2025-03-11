//import "./Modal.css";
import CloseButton from "../../assets/Close-Button.png";
import selectedCard from "../App/App";
import currentUser from "../App/App";

function ItemModal({ activeModal, onClose, card, handleCardDelete }) {
  const isOwn = selectedCard.owner === currentUser._id;

  const itemDeleteButtonClassname = `modal__delete ${
    isOwn ? "" : "modal__delete_hidden"
  }`;

  return (
    <div className={`modal ${activeModal === "preview" ? "modal_opened" : ""}`}>
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
              className="modal__delete"
              onClose={onClose}
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
