import ClothesSection from "../ClothesSection/ClothesSection";
import SideBar from "../SideBar/SideBar";
import "./Profile.css";
import React from "react";

function Profile({
  onCardClick,
  onCardDelete,
  onAddNewClick,
  cards,
  clothingItems,
  isLoggedIn,
}) {
  return (
    <div className="profile">
      <section className="profile__sidebar">
        <SideBar />
      </section>
      <section className="profile__clothes-section">
        <ClothesSection
          onCardClick={onCardClick}
          onCardDelete={onCardDelete}
          onAddNewClick={onAddNewClick}
          sectionData={cards}
          clothingItems={clothingItems}
          isLoggedIn={false}
        />
      </section>
    </div>
  );
}

export default Profile;
