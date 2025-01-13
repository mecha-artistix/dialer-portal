import useValidation from "@/features/auth/useValidation";
import { useToast } from "@/hooks/use-toast";
import React, { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";

type Props = { children: React.ReactNode };

const ProtectedRoutes = ({ children }: Props) => {
  const { toast } = useToast();
  const navigate = useNavigate();
  const location = useLocation();
  const { isValidating, user, refetch, isError } = useValidation();

  useEffect(() => {
    refetch();
    // console.log("refetch");
  }, [location.pathname, refetch]);

  if (isValidating) return <p>Validating...</p>;
  if (isError) {
    toast({
      title: "Token Expired",
      description: "Your Auth token has expired. Navigating to login page.",
      variant: "destructive",
      duration: 3000,
    });
    navigate("/login", { replace: true });
  }
  if (user) return <>{children}</>;
};

export default ProtectedRoutes;
