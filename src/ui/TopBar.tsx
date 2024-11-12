import { Button } from "@/components/ui/button";
import { useAppDispatch, useAppSelector } from "@/hooks/reduxHooks";
import { logout } from "@/store/userSlice";

function TopBar() {
  const userState = useAppSelector((state) => state.user);
  const dispatch = useAppDispatch();
  return (
    <div>
      {userState.isAuthenticated ? <Button onClick={() => dispatch(logout())}>Logout</Button> : <Button>Login</Button>}
    </div>
  );
}

export default TopBar;
