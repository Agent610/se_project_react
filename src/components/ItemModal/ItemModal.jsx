//import "./Modal.css";
import CloseButton from "../../assets/Close-Button.png";

function ItemModal({ activeModal, onClose, card }) {
  return (
    <div className={`modal ${activeModal === "preview" && "modal_opened"}`}>
      <div className="modal__content modal__content_type_image">
        <button onClick={onClose} type="button" className="modal__close">
          <img src={CloseButton} alt="Close-Button" />
        </button>
        <img src={card.link} alt="image" className="modal__image" />
        <div className="modal__footer">
          <h2 className="modal__caption">{card.name}</h2>
          <p className="modal__weather">Weather: {card.weather}</p>
          <button type="button" className="card__delete">
            <p className="card__delete-caption"> Delete item</p>
          </button>
        </div>
      </div>
    </div>
  );
}

export default ItemModal;
