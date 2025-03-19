//import { defaultClothingItems } from "../../utils/constants";
import ItemCard from "../ItemCard/ItemCard";
import { useContext } from "react";
import CurrentUserContext from "../../contexts/CurrentUserContext";

function ClothesSection({
  onAddNewClick,
  onCardClick,
  clothingItems,
  isLoggedIn,
}) {
  const currentUser = useContext(CurrentUserContext);

  const userItems = clothingItems.filter(
    (item) => item.owner === currentUser._id
  );

  return (
    <div className="clothes-section">
      <div>
        <p className="clothes__section-title">Your items</p>
        <button
          onClick={onAddNewClick}
          type="button"
          className="clothes__section-button"
        >
          + Add new
        </button>
      </div>
      <ul className="clothes-section__list">
        {userItems.map((item) => {
          console.log(item);
          return (
            <ItemCard
              key={item._id}
              item={item}
              onCardClick={onCardClick}
              isLoggedIn={isLoggedIn}
            />
          );
        })}
      </ul>
    </div>
  );
}

export default ClothesSection;
