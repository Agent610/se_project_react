import React, { useState } from "react";
import ModalWithForm from "../ModalWithForm/ModalWithForm";

const EditProfileModal = ({ isOpen, onSubmit, onClose }) => {
  const [name, setName] = useState("");
  const [avatar, setAvatar] = useState("");

  const handleNameOnChange = (e) => setName(e.target.value);
  const handleAvatarOnChange = (e) => setAvatar(e.target.value);

  function handleFormSubmit(e) {
    e.preventDefault();
    onSubmit({ name, avatar });
  }

  return (
    <ModalWithForm
      onClose={onClose}
      isOpen={isOpen}
      onSubmit={handleFormSubmit}
    ></ModalWithForm>
  );
};
export default EditProfileModal;
