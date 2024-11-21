import { useAppSelector } from "@/hooks/reduxHooks";
import { useEffect, useState } from "react";
import { patchDialer } from "@/lib/services";
import { TableCell, TableRow } from "@/components/ui/table";
import { dialerColumns } from "@/lib/constants";
import { TDialer } from "@/types/types";
import { AddDialerFormType } from "@/schemas";
import { useToast } from "@/hooks/use-toast";
import ActionBtns from "./ActionBtns";

interface DialerProps {
  data: TDialer;
}

export const DialerRow: React.FC<DialerProps> = ({ data }) => {
  const [isEditing, setIsEditing] = useState(false);
  const selector = useAppSelector((state) => state.dialers);
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [inputVals, setInputVals] = useState<Omit<AddDialerFormType, "pass">>({
    name: data.name,
    url: data.url,
    user: data.user,
  });

  const handleSave: React.MouseEventHandler<HTMLButtonElement> = async () => {
    toast({
      title: "Updating!",
      description: "Your request has been submitted.",
      variant: "default",
    });
    try {
      setIsSubmitting(true);
      const response = await patchDialer(data.id, inputVals);
      console.log(response);
      toast({
        title: "Updated!",
        description: "Your request was successfully submitted.",
        variant: "success",
      });
      setIsSubmitting(false);
    } catch (error) {
      console.log(error);
      toast({
        title: "Failed!",
        description: "Your request was failed to update.",
        variant: "destructive",
      });
    }
    setIsEditing(false);
    setIsSubmitting(false);
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
            isSubmitting={isSubmitting}
          />
        ) : (
          <TableCell key={i}>
            <input
              type="text"
              onChange={handleChange}
              value={inputVals[col.key]}
              name={col.key}
              disabled={Boolean(data.id !== selector.isSelected)}
              className={`w-full px-3 py-1 rounded transition-colors ${
                data.id !== selector.isSelected
                  ? "bg-white text-gray-900 border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  : "bg-gray-100 text-gray-500 border-gray-200"
              }`}
            />
          </TableCell>
        )
      )}
    </TableRow>
  );
};
