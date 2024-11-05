import { defaultClothingItems } from "../../utils/constants";
import ItemCard from "../ItemCard/ItemCard";
import "ClothesSection.css";

function ClothesSection({ onCardClick }) {
  return (
    <div className="clothes-section">
      <div>
        <p>Your items</p>
        <button>+ Add new</button>
      </div>
      <ul className="clothes-section__list">
        {defaultClothingItems.map((item) => {
          return (
            <ItemCard key={item._id} item={item} onCardClick={onCardClick} />
          );
        })}
      </ul>
    </div>
  );
}

export default ClothesSection;
