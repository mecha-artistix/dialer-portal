import { Button } from "@/components/ui/button";
import { useLogout } from "@/features/auth/useLogout";
import { useNavigate } from "react-router-dom";

function TopBar() {
  // const userState = useAppSelector((state) => state.user);
  const { logout } = useLogout();
  const navigate = useNavigate();
  function handleLogout() {
    logout(undefined, {
      onSuccess: () => {
        navigate("/login", { replace: true });
      },
    });
  }
  return (
    <div className="flex items-center justify-between">
      <Button className="ml-auto" onClick={handleLogout}>
        Logout
      </Button>
    </div>
  );
}

export default TopBar;
