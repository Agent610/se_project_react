import React, { useEffect } from "react";
import ModalWithForm from "../ModalWithForm/ModalWithForm";

const AddItemModal = ({ isOpen, onAddItem, onCloseModal }) => {
  const [name, setName] = useEffect("");
  const [imageUrl, setImageUrl] = useEffect("");
  const [weather, setWeather] = useEffect("");

  const handleNameOnChange = (e) => setName(e.target.value);
  const handleImageUrlOnChange = (e) => setImageUrl(e.target.value);
  const handleWeatherOnChange = (e) => setWeather(e.target.value);

  const handleSubmit = (e) => {
    e.preventDefault();
    onAddItem({ name, imageUrl, weather });
  };

  return (
    <ModalWithForm isOpen={isOpen} onClose={onCloseModal}>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={name}
          onChange={handleNameOnChange}
          placeholder="Name"
        />
        <input
          type="text"
          value={imageUrl}
          onChange={handleImageUrlOnChange}
          placeholder="Image URL"
        />
        <input
          type="text"
          value={weather}
          onChange={handleWeatherOnChange}
          placeholder="Weather"
        />
        <button type="submit">Add Garment</button>
      </form>
    </ModalWithForm>
  );
};

export default AddItemModal;
