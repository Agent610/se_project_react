import React, { useState } from "react";
import ModalWithForm from "../ModalWithForm/ModalWithForm";
import { Link } from "react-router-dom";

const RegisterModal = ({ isOpen, onSubmit, onClose }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [avatar, setAvatar] = useState("");

  const handleEmailOnChange = (e) => setEmail(e.target.value);
  const handlePasswordOnChange = (e) => setPassword(e.target.value);
  const handleNameOnChange = (e) => setName(e.target.value);
  const handleAvatarOnChange = (e) => setAvatar(e.target.value);

  function handleFormSubmit(e) {
    e.preventDefault();
    onSubmit({ email, password, name, avatar });
  }

  return (
    <ModalWithForm
      title="Sign Up"
      buttonText="Sign Up"
      onClose={onClose}
      isOpen={isOpen}
      onSubmit={handleFormSubmit}
    >
      <label htmlFor="register-email" className="modal__label">
        Email{" "}
        <input
          type="email"
          className="modal__input"
          id="register-email"
          placeholder="Email"
          onChange={handleEmailOnChange}
          value={email}
        />
      </label>
      <label htmlFor="register-password" className="modal__label">
        Password{" "}
        <input
          type="password"
          className="modal__input"
          id="register-password"
          placeholder="Password"
          onChange={handlePasswordOnChange}
          value={password}
        />
      </label>
      <label htmlFor="register-name" className="modal__label">
        Name{" "}
        <input
          type="text"
          className="modal__input"
          id="register-name"
          placeholder="Name"
          onChange={handleNameOnChange}
          value={name}
        />
      </label>
      <label htmlFor="avatar-id" className="modal__label">
        Avatar URL{" "}
        <input
          type="url"
          className="modal__input"
          id="avatar-id"
          placeholder="Avatar URL"
          onChange={handleAvatarOnChange}
          value={avatar}
        />
      </label>
      <div className="register__button">
        <button type="submit" className="register__link">
          {" "}
          Sign up
        </button>
      </div>
      <div className="register__signin">
        <Link to="login" className="register__login-link">
          Log in
        </Link>
      </div>
    </ModalWithForm>
  );
};

export default RegisterModal;
