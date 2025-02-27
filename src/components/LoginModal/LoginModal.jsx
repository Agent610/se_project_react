import React, { useState } from "react";
import ModalWithForm from "../ModalWithForm/ModalWithForm";

const LoginModal = ({ isOpen, onSubmit, onClose }) => {
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
      <button>Sign up</button>
      <label htmlFor="login-email" className="modal__label">
        Email{" "}
        <input
          type="email"
          className="modal__input"
          id="login-email"
          placeholder="Email"
          onChange={handleEmailOnChange}
          value={email}
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
        />
      </label>
    </ModalWithForm>
  );
};

export default LoginModal;
