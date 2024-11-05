import avatar from "../../assets/avatar.png";
//import SideBar from "SideBar.css";

function SideBar() {
  return (
    <div className="sidebar">
      <img className="sidebar__avatar" src={avatar} alt="Avatar" />
      <p className="sidebar__username">User Name</p>
    </div>
  );
}

export default SideBar;
