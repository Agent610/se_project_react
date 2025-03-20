import { useContext } from "react";
import "./ItemCard.css";
import CurrentUserContext from "../../contexts/CurrentUserContext";

function ItemCard({ item, onCardClick, onCardDelete, onCardLike }) {
  const currentUser = useContext(CurrentUserContext);
  const isLiked = item.likes.some((id) => id === currentUser._id);

  const handleCardClick = () => {
    onCardClick(item);
  };

  const handleCardDelete = () => {
    onCardDelete(item);
  };

  // const handleCardLike = () => {
  //   onCardLike(item);
  // };

  const handleLike = () => {
    onCardLike({ id: item._id, isLiked });
  };

  //const isLiked = item.likes.some((id) => id === currentUser._id);

  console.log(item);

  return (
    <li className="card">
      <h2 className="card__name">{item.name}</h2>
      <img
        onClick={handleCardClick}
        className="card__image"
        src={item.imageUrl}
        alt={item.name}
        //onCardLike={handleCardLike}
        //isLiked={handleLike}
      />
      <button
        type="button"
        className={`card__like-button ${
          isLiked ? "card__like-button_active" : ""
        }`}
        onClick={handleLike}
      />
    </li>
  );
}

export default ItemCard;
