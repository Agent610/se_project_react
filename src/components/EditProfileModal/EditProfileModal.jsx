import React, { useContext, useEffect, useState } from "react";
import ModalWithForm from "../ModalWithForm/ModalWithForm";
import CurrentUserContext from "../../contexts/CurrentUserContext";

const EditProfileModal = ({ isOpen, onSubmit, onClose }) => {
  //const currentUser = useContext(CurrentUserContext);
  const userData = useContext(CurrentUserContext);
  const currentUser = userData.user;
  console.log(JSON.stringify(currentUser));

  const [name, setName] = useState(currentUser?.name || "");
  const [avatar, setAvatar] = useState(currentUser?.avatar || "");

  const handleNameOnChange = (e) => setName(e.target.value);
  const handleAvatarOnChange = (e) => setAvatar(e.target.value);

  function handleFormSubmit(e) {
    e.preventDefault();
    onSubmit({ name, avatar });
  }

  useEffect(() => {
    if (currentUser) {
      setName(currentUser.name);
      setAvatar(currentUser.avatar);
    }
  }, [currentUser]);
  console.log(name, avatar);

  return (
    <ModalWithForm
      title="Change Profile Data"
      buttonText="Save Changes"
      onClose={onClose}
      isOpen={isOpen}
      onSubmit={handleFormSubmit}
    >
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
