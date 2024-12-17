import { NavLink } from "react-router-dom";

function SideBar() {
  return (
    <div className="flex flex-col gap-2">
      <NavLink className="navLink" to="/">
        Dashboard
      </NavLink>
      <NavLink className="navLink" to="/recordings-single-agent">
        Recordings By Agent
      </NavLink>
      <NavLink className="navLink" to="/recordings-all-agents">
        Recordings All Agents
      </NavLink>
      <NavLink className="navLink" to="/recordings-by-status">
        Recordings By Status
      </NavLink>
      <NavLink className="navLink" to="/recordings">
        Recordings V2
      </NavLink>
      <NavLink className="navLink" to="/account">
        Account
      </NavLink>
    </div>
  );
}
export default SideBar;
