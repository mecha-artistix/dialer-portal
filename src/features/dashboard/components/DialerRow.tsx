import { useAppSelector } from "@/hooks/reduxHooks";
import { useEffect, useState } from "react";
import { TableCell, TableRow } from "@/components/ui/table";
import { dialerColumns } from "@/lib/constants";
import { TDialer } from "@/types/types";
import { AddDialerFormType } from "@/schemas";
import { useToast } from "@/hooks/use-toast";
import ActionBtns from "./ActionBtns";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { apiFlask } from "@/lib/interceptors";

interface DialerProps {
  data: TDialer;
}

export const DialerRow: React.FC<DialerProps> = ({ data }) => {
  const queryClient = useQueryClient();
  const [isEditing, setIsEditing] = useState(false);
  const selector = useAppSelector((state) => state.dialers);
  const { toast } = useToast();

  // const [inputVals, setInputVals] = useState<Omit<AddDialerFormType, "pass">>({
  const [inputVals, setInputVals] = useState<AddDialerFormType>({
    name: data.name,
    url: data.url,
    user: data.user,
    folder_name: data.folder_name,
    pass: data.pass,
  });

  // Update mutation
  const updateMutation = useMutation({
    mutationFn: (updatedData: AddDialerFormType) => apiFlask.put(`/portal/configure-dialer/${data.id}`, updatedData),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["dialers"] });
      toast({
        title: "Updated!",
        description: "Your request was successfully submitted.",
        variant: "success",
      });
    },
    onMutate() {
      toast({
        title: "Updating...",
        description: "Your request is being processed.",
        variant: "default",
      });
    },
    onError(error) {
      console.log({ error });
      toast({
        title: "Failed!",
        description: "Your request was failed to update.",
        variant: "destructive",
      });
    },
  });

  const handleSave: React.MouseEventHandler<HTMLButtonElement> = async () => {
    updateMutation.mutate(inputVals);
  };

  const handleChange: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    const { name, value } = e.target;
    setInputVals((prevValues) => ({
      ...prevValues,
      [name]: value,
    }));
  };

  useEffect(() => {
    setIsEditing(() => Boolean(selector.isSelected === data.id));
  }, [selector.isSelected, data.id]);

  return (
    <TableRow>
      {dialerColumns.map((col, i) =>
        col.key === "actions" ? (
          <ActionBtns
            key={i}
            data={data}
            isEditing={isEditing}
            setIsEditing={setIsEditing}
            handleSave={handleSave}
            isSubmitting={updateMutation.isPending}
          />
        ) : (
          <TableCell key={i}>
            <input
              type={col.key === "pass" ? "password" : "text"}
              onChange={handleChange}
              value={inputVals[col.key] || ""}
              name={col.key}
              disabled={Boolean(data.id !== selector.isSelected)}
              className={`w-full px-3 py-1 rounded transition-colors ${
                data.id !== selector.isSelected
                  ? "bg-white text-gray-900 border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  : "bg-gray-100 text-gray-500 border-gray-200"
              }`}
            />
          </TableCell>
        ),
      )}
    </TableRow>
  );
};
