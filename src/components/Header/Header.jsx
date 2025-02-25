import React, { useContext } from "react";
import "./Header.css";
import logo from "../../assets/logo.svg";
import avatar from "../../assets/avatar.png";
import ToggleSwitch from "../ToggleSwitch/ToggleSwitch";
import { Link } from "react-router-dom";
import CurrentUserContext from "../../contexts/CurrentUserContext";

function Header({ handleAddClick, weatherData }) {
  const currentDate = new Date().toLocaleString("default", {
    month: "long",
    day: "numeric",
  });

  const { user = {} } = useContext(CurrentUserContext);
  const avatar = user.name ? user.name.charAt(0) : "";

  return (
    <header className="header">
      <Link to="/">
        <img className="header__logo" src={logo} alt="logo" />
      </Link>
      <p className="header__date-and-location">
        {currentDate}, {weatherData.city}
      </p>
      <ToggleSwitch />
      <button
        onClick={handleAddClick}
        type="button"
        className="header__add-clothes-button"
      >
        + Add Clothes
      </button>
      <div className="header__user-container">
        <Link to="/profile" className="header__link">
          <p className="header__username">{user.name}</p>
          {avatar ? (
            <img src={avatar} alt={user.name} className="header__avatar" />
          ) : (
            <div className="header__avatar-placeholder">
              {user.name ? user.name.charAt(0).toUpperCase() : ""}
            </div>
          )}
        </Link>
      </div>
    </header>
  );
}

export default Header;
