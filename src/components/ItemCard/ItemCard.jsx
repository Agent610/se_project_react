import { useContext } from "react";
import "./ItemCard.css";
import CurrentUserContext from "../../contexts/CurrentUserContext";

function ItemCard({ item, onCardClick, onCardDelete, onCardLike, isLoggedIn }) {
  const userData = useContext(CurrentUserContext);
  const currentUser = userData.user;
  //const isLiked = item.likes.some((id) => id === currentUser.id);
  const isLiked = item.likes.some((id) => id === currentUser._id) || false;
  const itemLikeButtonClassName = isLiked ? "card__like-on" : "card__like-off";

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
        className={isLoggedIn ? itemLikeButtonClassName : "hidden"}
        onClick={handleLike}
        //onCardDelete={isLoggedIn ? handleCardDelete : ""}
      />
    </li>
  );
}

export default ItemCard;
