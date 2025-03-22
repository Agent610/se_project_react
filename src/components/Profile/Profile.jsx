import ClothesSection from "../ClothesSection/ClothesSection";
import SideBar from "../SideBar/SideBar";
import "./Profile.css";
import React from "react";

function Profile({
  onCardClick,
  onCardDelete,
  handleAddClick,
  cards,
  clothingItems,
  isLoggedIn,
  handleLogout,
  handleEditClick,
}) {
  return (
    <div className="profile">
      <section className="profile__sidebar">
        <SideBar
          isLoggedIn={isLoggedIn}
          handleLogout={handleLogout}
          handleEditClick={handleEditClick}
        />
      </section>
      <section className="profile__clothes-section">
        <ClothesSection
          onCardClick={onCardClick}
          onCardDelete={onCardDelete}
          handleAddClick={handleAddClick}
          sectionData={cards}
          clothingItems={clothingItems}
          isLoggedIn={isLoggedIn}
        />
      </section>
    </div>
  );
}

export default Profile;
