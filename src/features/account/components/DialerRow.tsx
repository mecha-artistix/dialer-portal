import { useAppDispatch, useAppSelector } from "@/hooks/reduxHooks";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { setIsSelected } from "../dialerSlice";
import { patchDialer } from "@/lib/services";
import { TableCell, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { dialerColumns } from "@/lib/constants";
import { TDialer } from "@/types/types";
import { AddDialerFormType } from "@/schemas";
import { Pencil, Voicemail, CheckCheck } from "lucide-react";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { useToast } from "@/hooks/use-toast";

interface DialerProps {
  data: TDialer;
}

export const DialerRow: React.FC<DialerProps> = ({ data }) => {
  const selector = useAppSelector((state) => state.dialers);
  const dispatch = useAppDispatch();
  const [isEditing, setIsEditing] = useState(false);
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [inputVals, setInputVals] = useState<Omit<AddDialerFormType, "pass">>({
    name: data.name,
    url: data.url,
    user: data.user,
  });
  const { toast } = useToast();

  const editHandler = () => {
    setIsEditing(true);
    dispatch(setIsSelected(data.id));
  };

  const handleChange: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    const { name, value } = e.target;
    setInputVals((prevValues) => ({
      ...prevValues,
      [name]: value,
    }));
  };

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
    setIsSubmitting(false);
  };

  useEffect(() => {
    setIsEditing((prev) => Boolean(selector.isSelected === data.id));
  }, [selector.isSelected, data.id]);

  return (
    <TableRow>
      {dialerColumns.map((col, i) =>
        col.key === "actions" ? (
          <TableCell key={i} className="flex gap-2">
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    size="icon"
                    variant="outline"
                    onClick={() => navigate("/recordings", { state: { formData: data } })}
                  >
                    <Voicemail />
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Get Recordings</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>

            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  {isEditing ? (
                    <Button variant="outline" onClick={handleSave} size="icon" disabled={isSubmitting}>
                      <CheckCheck />
                    </Button>
                  ) : (
                    <Button variant="outline" onClick={editHandler} size="icon">
                      <Pencil />
                    </Button>
                  )}
                </TooltipTrigger>
                <TooltipContent>{isEditing ? <p>Save Changes</p> : <p>Edit Dialer</p>}</TooltipContent>
              </Tooltip>
            </TooltipProvider>

            {/* {isEditing && <Button onClick={handleSave}>Save</Button>} */}
          </TableCell>
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
