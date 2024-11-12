import { Link } from "react-router-dom";

function Header() {
  return (
    <header>
      <Link to="/">Dashboard</Link>
      <Link to="/login">Login</Link>
    </header>
  );
}

export default Header;
