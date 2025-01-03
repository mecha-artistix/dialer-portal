import { apiFlask } from "@/lib/interceptors";
import { useMutation } from "@tanstack/react-query";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

function useValidation() {
  const navigate = useNavigate();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const { mutate: validate, isPending: isValidating } = useMutation({
    mutationFn: async () => {
      const res = await apiFlask.get("/auth/protected");
      return res;
    },
    onError: (error) => {
      console.log("Error validating session:", error);
      navigate("/login", { replace: true });
    },
    onSuccess: () => setIsAuthenticated(true),
  });

  return { validate, isValidating, isAuthenticated };
}

export default useValidation;
