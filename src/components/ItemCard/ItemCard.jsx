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

  const handleLike = () => {
    onCardLike(item);
  };

  const isLiked = item.likes.some((id) => id === currentUser._id);
  return (
    <li className="card">
      <h2 className="card__name">{item.name}</h2>
      <img
        onClick={handleCardClick}
        className="card__image"
        src={item.imageUrl}
        alt={item.name}
        onCardLike={handleCardLike}
        isLiked={handleLike}
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
