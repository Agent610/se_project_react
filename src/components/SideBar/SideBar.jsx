import avatar from "../../assets/avatar.png";
//import { NavLink, useNavigate } from "react-router-dom";
//import { removeToken } from "../../utils/token";
import CurrentUserContext from "../../contexts/CurrentUserContext";
import { useContext, useState } from "react";

function SideBar(handleLogout) {
  const currentUser = useContext(CurrentUserContext);

  const SideBar = useState(true);
}

return (
  <div className="sidebar">
    <img className="sidebar__avatar" src={avatar} alt="Avatar" />
    <p className="sidebar__username">User Name</p>
    <li>
      <button onClick={handleLogout} className="sideBar__link sideBar__button">
        Sign Out
      </button>
    </li>
  </div>
);

export default SideBar;
