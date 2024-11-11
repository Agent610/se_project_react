import "./ItemCard.css";

function ItemCard({ item, onCardClick, onCardDelete }) {
  const handleCardClick = () => {
    onCardClick(item);
  };

  const handleCardDelete = () => {
    onCardDelete(item);
  };

  return (
    <li className="card">
      <h2 className="card__name">{item.name}</h2>
      <img
        onClick={handleCardClick}
        className="card__image"
        src={item.imageUrl}
        alt={item.name}
      />
    </li>
  );
}

export default ItemCard;

//ON card Delete when you get there

// <button
// type="Button", className=card__delete-button, onClick={}
