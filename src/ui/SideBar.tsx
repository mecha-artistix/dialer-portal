import { Link } from "react-router-dom";

function SideBar() {
  return (
    <ul>
      <li>
        <Link to="/">Dashboard</Link>
      </li>
      <li>
        <Link to="/recordings-single-agent">Recordings By Agent</Link>
      </li>
      <li>
        <Link to="/recordings-all-agents">Recordings All Agents</Link>
      </li>
      <li>
        <Link to="/account">Account</Link>
      </li>
    </ul>
  );
}

export default SideBar;
