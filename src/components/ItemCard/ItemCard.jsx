import "./ItemCard.css";

function ItemCard({ item, onCardClick, onCardDelete, onCardLike }) {
  const handleCardClick = () => {
    onCardClick(item);
  };

  const handleCardDelete = () => {
    onCardDelete(item);
  };

  const handleCardLike = () => {
    onCardLike(item);
  };

  return (
    <li className="card">
      <h2 className="card__name">{item.name}</h2>
      <img
        onClick={handleCardClick}
        className="card__image"
        src={item.imageUrl}
        alt={item.name}
        onCardLike={handleCardLike}
      />
      {/* <button
        type="button"
        className="card__delete"
        onClick={handleCardDelete}
      /> */}
    </li>
  );
}

export default ItemCard;
