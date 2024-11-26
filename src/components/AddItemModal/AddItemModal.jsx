import React, { useState } from "react";
import ModalWithForm from "../ModalWithForm/ModalWithForm";

const AddItemModal = ({ isOpen, handleSubmit, onClose }) => {
  const [name, setName] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [weather, setWeather] = useState("");

  const handleNameOnChange = (e) => setName(e.target.value);
  const handleImageUrlOnChange = (e) => setImageUrl(e.target.value);
  const handleWeatherOnChange = (e) => setWeather(e.target.value);

  function handleSubmit(e) {
    e.preventDefault();
    onAddItem({ name, imageUrl, weather });
  }

  return (
    <ModalWithForm isOpen={isOpen} onClose={onClose}>
      <div onSubmit={handleSubmit}>
        <input
          type="text"
          value={name}
          onChange={handleNameOnChange}
          placeholder="Name"
        />
        <input
          type="url"
          value={imageUrl}
          onChange={handleImageUrlOnChange}
          placeholder="Image URL"
        />
        <input
          type="radio"
          value={weather}
          onChange={handleWeatherOnChange}
          placeholder="Weather"
        />
        <button type="submit">Add Garment</button>
      </div>
    </ModalWithForm>
  );
};

export default AddItemModal;
