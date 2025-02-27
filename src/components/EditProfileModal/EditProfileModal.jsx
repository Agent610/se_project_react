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
    >
      <button>Save Changes</button>
      <label htmlFor="edit-name" className="modal__label">
        Name{""}
        <input
          type="name"
          className="modal__input"
          id="edit-name"
          placeholder="Name"
          onChange={handleNameOnChange}
          value={name}
        ></input>
      </label>
      <label htmlFor="edit-avatar" className="modal__label">
        Avatar{""}
        <input
          type="url"
          className="modal__input"
          id="edit-avatar"
          placeholder="Avatar Url"
          onChange={handleAvatarOnChange}
          value={avatar}
        ></input>
      </label>
    </ModalWithForm>
  );
};
export default EditProfileModal;
