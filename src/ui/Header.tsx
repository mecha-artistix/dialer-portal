import { Button } from "@/components/ui/button";
import { useAppDispatch, useAppSelector } from "@/hooks/reduxHooks";
import { logout } from "@/store/userSlice";
import { Link } from "react-router-dom";

function Header() {
  const userState = useAppSelector((state) => state.user);
  const dispatch = useAppDispatch();
  return (
    <header>
      <Link to="/">Dashboard</Link>
      <Link to="/recordings">Recordings</Link>
      <Link to="/account">Account</Link>
      {userState.isAuthenticated ? <Button onClick={() => dispatch(logout())}>Logout</Button> : <Button>Login</Button>}
    </header>
  );
}

export default Header;
