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

  //const { user = {} } = useContext(CurrentUserContext);
  //const currentUser = useContext(CurrentUserContext);
  const userData = useContext(CurrentUserContext);
  const currentUser = userData.user;
  console.log("User name:", userData.user?.name);

  //const avatar = user.avatar || "";

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
      <div className="header__user-container">
        {isLoggedIn ? (
          <Link to="/profile" className="header__link">
            <p className="header__username">{currentUser?.name}</p>
            {currentUser?.avatar ? (
              <img
                src={currentUser.avatar || avatar}
                alt={currentUser?.name}
                className="header__avatar"
              />
            ) : (
              <div className="header__avatar-placeholder">
                {currentUser?.name?.[0]?.toUpperCase()}
              </div>
            )}
            <button
              onClick={handleAddClick}
              type="button"
              className="header__add-clothes-button"
            >
              + Add Clothes
            </button>
          </Link>
        ) : (
          <>
            <div className="header__user">
              <button className="header__register" onClick={handleSignupClick}>
                Register
              </button>
              <button className="header__login" onClick={handleSigninClick}>
                Login
              </button>
            </div>
          </>
        )}
      </div>
    </header>
  );
}

export default Header;
