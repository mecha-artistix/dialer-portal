import { Link } from "react-router-dom";
import { Button } from "../ui/button";

interface LinkBtnProps {
  href: string;
  label: string;
}

export const LinkBtn: React.FC<LinkBtnProps> = ({ href, label }) => {
  return (
    <Button variant="link" size="sm" className="font-normal w-full" asChild>
      <Link to={href}>{label}</Link>
    </Button>
  );
};
