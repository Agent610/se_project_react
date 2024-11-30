import "./ItemCard.css";

function ItemCard({ item, onCardClick, onCardDelete }) {
  const handleCardClick = () => {
    onCardClick(item);
  };

  const handleDeleteClick = () => {
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
      <button
        type="button"
        className="card__delete"
        onClick={handleDeleteClick}
      />
    </li>
  );
}

export default ItemCard;
