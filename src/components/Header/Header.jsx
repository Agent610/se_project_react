import React, { useContext } from "react";
import "./Header.css";
import logo from "../../assets/logo.svg";
import avatar from "../../assets/avatar.png";
import ToggleSwitch from "../ToggleSwitch/ToggleSwitch";
import { Link } from "react-router-dom";
import CurrentUserContext from "../../contexts/CurrentUserContext";

function Header({
  handleAddClick,
  weatherData,
  handleSigninClick,
  handleSignupClick,
  isLoggedIn,
}) {
  const currentDate = new Date().toLocaleString("default", {
    month: "long",
    day: "numeric",
  });

  const { user = {} } = useContext(CurrentUserContext);
  const avatar = user.avatar || "";

  return (
    <header className="header">
      <Link to="/">
        <img className="header__logo" src={logo} alt="logo" />
      </Link>
      <p className="header__date-and-location">
        {new Date().toLocaleDateString("default", {
          month: "long",
          day: "numeric",
        })}
        ,{weatherData.city}
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
        {isLoggedIn ? (
          <Link to="/profile" className="header__link">
            <p className="header__username">{user.name}</p>
            <img
              src={avatar || "placeholder.png"}
              alt={user.name}
              className="header__avatar"
            />
            <div className="header__avatar-placeholder">
              {user.name ? user.name.charAt(0).toUpperCase() : ""}
            </div>
          </Link>
        ) : (
          <>
            <button className="header__login" onClick={handleSigninClick}>
              Login
            </button>
            <button className="header__register" onClick={handleSignupClick}>
              Register
            </button>
          </>
        )}
      </div>
    </header>
  );
}

export default Header;
