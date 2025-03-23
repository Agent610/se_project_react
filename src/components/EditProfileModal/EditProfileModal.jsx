import React, { useContext, useEffect, useState } from "react";
import ModalWithForm from "../ModalWithForm/ModalWithForm";
import CurrentUserContext from "../../contexts/CurrentUserContext";

const EditProfileModal = ({ isOpen, onSubmit, onClose }) => {
  const { currentUser } = useContext(CurrentUserContext);
  //const userData = currentUser.user;
  const [name, setName] = useState(currentUser?.name || "");
  const [avatar, setAvatar] = useState(currentUser?.avatar || "");

  const handleNameOnChange = (e) => setName(e.target.value);
  const handleAvatarOnChange = (e) => setAvatar(e.target.value);

  function handleFormSubmit(e) {
    e.preventDefault();
    onSubmit({ name, avatar });
  }

  useEffect(() => {
    console.log(
      "EditProfileModal- currentUser:",
      JSON.stringify(currentUser, null, 2)
    );
    if (currentUser) {
      setName(currentUser.name || "");
      setAvatar(currentUser.avatar || "");
    }
  }, [currentUser]);

  return (
    <ModalWithForm
      title="Change Profile Data"
      buttonText="Save Changes"
      onClose={onClose}
      isOpen={isOpen}
      onSubmit={handleFormSubmit}
    >
      {/* <button>Save Changes</button> */}
      <label htmlFor="edit-name" className="modal__label">
        Name{""}
        <input
          type="name"
          className="modal__input"
          id="edit-name"
          placeholder="Name"
          onChange={handleNameOnChange}
          value={name}
          required
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
          required
        ></input>
      </label>
    </ModalWithForm>
  );
};

export default EditProfileModal;
