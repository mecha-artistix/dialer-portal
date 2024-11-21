import { Button } from "@/components/ui/button";
import { TableCell } from "@/components/ui/table";
import { useAppDispatch, useAppSelector } from "@/hooks/reduxHooks";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { CheckCheck, Pencil, Voicemail, Trash2 } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { setDialers, setIsSelected } from "../dialerSlice";
import { TDialer } from "@/types/types";
import { deleteDialerReq } from "@/lib/services";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";

interface ActionBtnsProps {
  data: TDialer;
  isEditing: boolean;
  setIsEditing: React.Dispatch<React.SetStateAction<boolean>>;
  handleSave: React.MouseEventHandler<HTMLButtonElement>;
  isSubmitting: boolean;
}

const ActionBtns: React.FC<ActionBtnsProps> = ({ data, isEditing, setIsEditing, handleSave, isSubmitting }) => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const selector = useAppSelector((state) => state.dialers);
  const { toast } = useToast();

  const [isDeleting, setIsDeleting] = useState(false);
  const editHandler = () => {
    setIsEditing(true);
    dispatch(setIsSelected(data.id));
  };

  const handleDelete = async () => {
    toast({
      title: "Deleting!",
      description: "Your request has been submitted.",
      variant: "default",
    });
    try {
      setIsDeleting(true);
      await deleteDialerReq(data.id);
      dispatch(setDialers(selector.dialers.filter((dialer) => dialer.id !== data.id)));
      toast({
        title: "Updated!",
        description: "Your request was successfully submitted.",
        variant: "success",
      });
      setIsDeleting(false);
    } catch (error) {
      console.log(error);
      toast({
        title: "Updated!",
        description: "Your request was successfully submitted.",
        variant: "success",
      });
    }
    setIsDeleting(false);
  };

  return (
    <TableCell className="flex gap-2">
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

      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <Button variant="outline" size="icon" onClick={handleDelete} disabled={isDeleting}>
              <Trash2 />
            </Button>
          </TooltipTrigger>
          <TooltipContent>
            <p>Delete Dialer</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    </TableCell>
  );
};

export default ActionBtns;
