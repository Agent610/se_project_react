import avatar from "../../assets/avatar.png";
import { NavLink, useNavigate } from "react-router-dom";
import { removeToken } from "../../utils/token";

function SideBar() {
  const SideBar = ({ setIsLoggedIn }) => {
    const navigate = useNavigate();

    function handleSignOut() {
      removeToken();
      navigate("/login");
      setIsLoggedIn(false);
    }
  };
  return (
    <div className="sidebar">
      <img className="sidebar__avatar" src={avatar} alt="Avatar" />
      <p className="sidebar__username">User Name</p>
      <li>
        <button
          onClick={handleSignOut}
          className="sideBar__link sideBar__button"
        >
          Sign Out
        </button>
      </li>
    </div>
  );
}

export default SideBar;
