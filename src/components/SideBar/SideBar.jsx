import avatar from "../../assets/avatar.png";
import { useContext, useState } from "react";
import CurrentUserContext from "../../contexts/CurrentUserContext";
import "./SideBar.css";

function SideBar({ handleEditClick, handleLogout }) {
  const currentUser = useContext(CurrentUserContext);
  const setSidebar = useState(true);

  return (
    <div className="sidebar">
      <div className="sidebar__user-information">
        {currentUser?.avatar ? (
          <img
            className="sidebar__avatar"
            src={currentUser?.avatar}
            alt={currentUser?.name}
          />
        ) : (
          <div className="sidebar__avatar-placeholder">
            {currentUser?.name ? currentUser?.name[0].toUpperCase() : ""}
          </div>
        )}
        <p className="sidebar__userName">{currentUser?.name}</p>
      </div>
      <div className="sidebar__buttons">
        <button
          type="button"
          onClick={handleEditClick}
          className="sidebar__edit"
        >
          {" "}
          Change Profile Data
        </button>
        <button type="type" onClick={handleLogout} className="sidebar__logout">
          Sign out
        </button>
      </div>
    </div>
  );
}
export default SideBar;
