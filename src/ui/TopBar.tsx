import { Button } from "@/components/ui/button";
import { useAppDispatch, useAppSelector } from "@/hooks/reduxHooks";
import { logout } from "@/store/userSlice";

function TopBar() {
  const userState = useAppSelector((state) => state.user);
  const dispatch = useAppDispatch();
  return (
    <div className="flex items-center justify-between">
      {userState.isAuthenticated ? (
        <Button className="ml-auto" onClick={() => dispatch(logout())}>
          Logout
        </Button>
      ) : (
        <Button>Login</Button>
      )}
    </div>
  );
}

export default TopBar;
