import { NavLink } from "react-router-dom";

function SideBar() {
  return (
    <div className="flex flex-col gap-2">
      <NavLink className="navLink" to="/">
        Dashboard
      </NavLink>

      <NavLink className="navLink" to="/recordings">
        Recordings
      </NavLink>
      <NavLink className="navLink" to="/account">
        Add User
      </NavLink>
    </div>
  );
}
export default SideBar;

{
  /* <NavLink className="navLink" to="/recordings-single-agent">
        Recordings By Agent
      </NavLink>
      <NavLink className="navLink" to="/recordings-all-agents">
        Recordings All Agents
      </NavLink>
      <NavLink className="navLink" to="/recordings-by-status">
        Recordings By Status
      </NavLink> */
}
