import { useContext, useState } from "react";
import avatar from "../../assets/avatar.png";
import CurrentUserContext from "../../contexts/CurrentUserContext";

function SideBar() {
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
