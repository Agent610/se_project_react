import React, { useState } from "react";
import ModalWithForm from "../ModalWithForm/ModalWithForm";
import "./LoginModal.css";

const LoginModal = ({ isOpen, onSubmit, onClose, handleRegister }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleEmailOnChange = (e) => setEmail(e.target.value);
  const handlePasswordOnChange = (e) => setPassword(e.target.value);

  function handleFormSubmit(e) {
    e.preventDefault();
    onSubmit({ email, password });
  }

  return (
    <ModalWithForm
      title="Log In"
      buttonText="Log in"
      onClose={onClose}
      isOpen={isOpen}
      onSubmit={handleFormSubmit}
    >
      <label htmlFor="login-email" className="modal__label">
        Email{" "}
        <input
          type="email"
          className="modal__input"
          id="login-email"
          placeholder="Email"
          onChange={handleEmailOnChange}
          value={email}
          required
        />
      </label>
      <label htmlFor="login-password" className="modal__label">
        Password{" "}
        <input
          type="password"
          className="modal__input"
          id="login-password"
          placeholder="Password"
          onChange={handlePasswordOnChange}
          value={password}
          required
        />
      </label>
      <button type="button" className="login__link" onClick={handleRegister}>
        or Sign up
      </button>
    </ModalWithForm>
  );
};

export default LoginModal;
