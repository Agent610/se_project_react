import avatar from "../../assets/avatar.png";

function SideBar() {
  const SideBar = ({ setIsLoggedIn }) => {
    const handleSignOut = () => {
      localStorage.removeItem("token");
      setIsLoggedIn(false);
    };
  };
  return (
    <div className="sidebar">
      <img className="sidebar__avatar" src={avatar} alt="Avatar" />
      <p className="sidebar__username">User Name</p>
    </div>
  );
}

export default SideBar;
