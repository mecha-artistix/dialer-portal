import useValidation from "@/features/auth/useValidate";
import React, { useEffect } from "react";

type Props = { children: React.ReactNode };

const ProtectedRoutes = ({ children }: Props) => {
  const { isValidating, isAuthenticated, validate } = useValidation();
  useEffect(() => {
    validate();
  });

  if (isValidating) return <p>Validating...</p>;

  if (isAuthenticated) return <>{children}</>;
};

export default ProtectedRoutes;
