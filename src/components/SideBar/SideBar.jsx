import avatar from "../../assets/avatar.png";
//import { NavLink, useNavigate } from "react-router-dom";
//import { removeToken } from "../../utils/token";
import { useContext, useState } from "react";
import CurrentUserContext from "../../contexts/CurrentUserContext";

function SideBar({ handleLogout, handleEditClick }) {
  const currentUser = useContext(CurrentUserContext);
  const [sidebar, setSideBar] = useState(true);

  return (
    <div className="sidebar">
      <img className="sidebar__avatar" src={avatar} alt="Avatar" />
      <p className="sidebar__username">{currentUser?.name}</p>
      <li>
        <button
          onClick={handleEditClick}
          className="sideBar__link-sideBar__edit"
        >
          {" "}
          Change Profile Data
        </button>
        <button
          onClick={handleLogout}
          className="sideBar__link-sideBar__button"
        >
          Sign Out
        </button>
      </li>
    </div>
  );
}

export default SideBar;
