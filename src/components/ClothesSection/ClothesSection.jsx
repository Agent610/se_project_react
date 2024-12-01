//import { defaultClothingItems } from "../../utils/constants";
import ItemCard from "../ItemCard/ItemCard";

function ClothesSection({ handleAddClick, onCardClick, clothingItems }) {
  return (
    <div className="clothes-section">
      <div>
        <p className="clothes__section-title">Your items</p>
        <button
          onClick={handleAddClick}
          type="button"
          className="clothes__section-button"
        >
          + Add new
        </button>
      </div>
      <ul className="clothes-section__list">
        {clothingItems.map((item) => {
          return (
            <ItemCard key={item._id} item={item} onCardClick={onCardClick} />
          );
        })}
      </ul>
    </div>
  );
}

export default ClothesSection;
